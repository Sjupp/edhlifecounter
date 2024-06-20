"use client";

import * as React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ITEMS_PER_PAGE = 100; // Number of items to load per batch

interface ComboboxProps {
  legendaryCreatures: any[];
  creatureMap: Map<string, string>;
}

export function Combobox({
  legendaryCreatures = [],
  creatureMap = new Map(),
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState("");
  const [displayedItems, setDisplayedItems] = React.useState(
    legendaryCreatures.slice(0, ITEMS_PER_PAGE)
  );
  const [searchTerm, setSearchTerm] = React.useState("");
   const [currentPage, setCurrentPage] = React.useState(1);

  const filteredCreatures = React.useMemo(() => {
    if (!searchTerm) return legendaryCreatures;
    return legendaryCreatures.filter((creature) =>
      creature.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, legendaryCreatures]);

  // Load more items when the user reaches the end of the list
  const loadMoreItems = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newItems = legendaryCreatures.slice(startIndex, endIndex);

    setDisplayedItems((prevItems) => [...prevItems, ...newItems]);
    setCurrentPage(nextPage);
  };

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const creature = filteredCreatures[index];
    return (
      <CommandItem
        key={creature.id}
        value={creature.name}
        onSelect={() => {
          setSelectedName(creature.name);
          setOpen(false);
        }}
        style={style}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
          selectedName === creature.name ? "opacity-100" : "opacity-0"
          )}
        />
        {creature.name}
      </CommandItem>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedName || "Select commander..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[200px] p-0`}>
        <Command>
          <CommandInput
            placeholder="Search commander..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No commander found.</CommandEmpty>
            <CommandGroup>
              <List
                height={2000}
                itemCount={filteredCreatures.length}
                itemSize={35}
                width={220}
              >
                {Row}
              </List>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
