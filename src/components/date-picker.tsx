"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import "react-day-picker/style.css";


import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import "./date-picker.css"

interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
    className?: string;
    placeholder?: string;
};

export const DatePicker = ({ value, onChange, className, placeholder = "Select Date" }: DatePickerProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                variant="outline" 
                size="lg"
                className={cn("w-full justify-start text-left font-normal px-3", !value && "text-muted-foreground", className)}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <DayPicker
                    mode="single"
                    selected={value}
                    onSelect={(date) =>onChange(date as Date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
