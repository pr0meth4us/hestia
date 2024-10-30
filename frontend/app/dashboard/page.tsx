"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import Header from "@/app/dashboard/components/header";
const DashboardHeader = Header;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/app/dashboard/hooks";
import { Error } from "@/app/dashboard/components/states/error";
import { Actions } from "@/app/dashboard/components/list/actions";
import { DeleteDialog } from "@/app/dashboard/components/items/delete-dialog";
import { ItemTable } from "@/app/dashboard/components/items/table";
import { QuickAddModal } from "@/app/dashboard/components/list/quick-add-modal";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const {
    lists,
    error,
    deleteItemDialog,
    fetchLists,
    handleGroup,
    handleDeleteList,
    handleDeleteItem,
    handleDeleteItemConfirm,
    handleEditItem,
    handleEditList,
    handleDeleteDialogChange,
    handleAddItem,
    handleAddItemConfirm,
    handleQuickCreate,
    isAddingItem,
  } = useDashboard();

  useEffect(() => {
    fetchLists();
  }, []);

  const filteredLists = lists.filter(
    (list) =>
      list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.items.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  if (error) return <Error error={error} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <DashboardHeader
          searchQuery={searchQuery}
          setIsQuickAddOpen={setIsQuickAddOpen}
          setSearchQuery={setSearchQuery}
        />

        <Card className="border border-border">
          <CardContent className="p-6">
            {filteredLists.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    {searchQuery ? (
                      <Search className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {searchQuery ? "No results found" : "No lists available"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Create your first list to get started"}
                </p>
                {!searchQuery && (
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New List
                  </Button>
                )}
              </div>
            ) : (
              <Accordion collapsible className="w-full space-y-2" type="single">
                {filteredLists.map((list) => (
                  <AccordionItem
                    key={list.listId}
                    className="border border-border rounded-lg overflow-hidden"
                    value={list.listId}
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-foreground">
                            {list.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {list.items.length} items
                          </span>
                        </div>
                        <Actions
                          listId={list.listId}
                          listName={list.name}
                          onAdd={handleAddItem}
                          onDelete={handleDeleteList}
                          onEdit={handleEditList}
                          onGroup={handleGroup}
                        />
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="px-4 py-4 bg-background">
                        <ItemTable
                          isAddingItem={isAddingItem}
                          items={list.items}
                          listId={list.listId}
                          onAddItem={handleAddItemConfirm}
                          onDeleteItem={handleDeleteItem}
                          onEditItem={handleEditItem}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onCreateList={handleQuickCreate}
      />

      <DeleteDialog
        isOpen={deleteItemDialog.isOpen}
        onConfirm={handleDeleteItemConfirm}
        onOpenChange={handleDeleteDialogChange}
      />
    </div>
  );
}
