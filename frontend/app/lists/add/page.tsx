"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { listApi } from "@/app/api/list";
import ListUploader from "@/app/components/ListUploader";

export default function CreateListPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await listApi.addList({ name, content });
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 ">
      <Button className="mb-4" variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <ListUploader
        content={content}
        handleSubmit={handleSubmit}
        isAuthUser={true}
        name={name}
        setContent={setContent}
        setName={setName}
      />
    </div>
  );
}
