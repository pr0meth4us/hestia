"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { listApi } from "@/app/api/list";
import { Group, ListItem } from "@/app/types/list";
import CurrentList from "@/app/components/CurrentList";
import GroupGenerator from "@/app/components/GroupGenerator";
import GroupDisplayer from "@/app/components/GroupDisplayer";

const GroupProcess: React.FC = () => {
  const [list, setList] = useState<ListItem>({
    listId: "",
    name: "",
    items: [],
    createdAt: "",
  });
  const [shuffledGroups, setShuffledGroups] = useState<Group[]>([]);
  const [excludedMembers, setExcludedMembers] = useState<string[]>([]);
  const params = useParams();
  const listId = params.listId as string;

  useEffect(() => {
    const fetchList = async () => {
      const response = await listApi.getListById(listId);

      setList(response);
    };

    fetchList();
  }, [listId]);

  const generateGroups = async (groupSize: string, numberOfGroups: string) => {
    const response = await listApi.group(
      listId,
      groupSize,
      numberOfGroups,
      excludedMembers.join(","),
    );

    setShuffledGroups(response);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <CurrentList
        excludedMembers={excludedMembers}
        list={list}
        setExcludedMembers={setExcludedMembers}
      />
      <GroupGenerator generateGroups={generateGroups} list={list} />
      {shuffledGroups.length > 0 && (
        <GroupDisplayer
          groups={shuffledGroups}
          onRegenerate={() => setShuffledGroups([])}
        />
      )}
    </div>
  );
};

export default GroupProcess;
