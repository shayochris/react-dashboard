import * as React from "react";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import {
    DayPicker,
    getDefaultClassNames,
    type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
    formatters,
    components,
    ...props
}: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
                String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
                className,
            )}
            captionLayout={captionLayout}
            formatters={{
                formatMonthDropdown: (date) =>
                    date.toLocaleString("default", { month: "short" }),
                ...formatters,
            }}
            classNames={{
                root: cn("w-fit", defaultClassNames.root),
                months: cn(
                    "relative flex flex-col gap-4 md:flex-row",
                    defaultClassNames.months,
                ),
                month: cn(
                    "flex w-full flex-col gap-4",
                    defaultClassNames.month,
                ),
                nav: cn(
                    "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
                    defaultClassNames.nav,
                ),
                button_previous: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
                    defaultClassNames.button_previous,
                ),
                button_next: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
                    defaultClassNames.button_next,
                ),
                month_caption: cn(
                    "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
                    defaultClassNames.month_caption,
                ),
                dropdowns: cn(
                    "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
                    defaultClassNames.dropdowns,
                ),
                caption_label: cn(
                    "font-medium select-none",
                    captionLayout === "label"
                        ? "text-sm"
                        : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
                    defaultClassNames.caption_label,
                ),
                table: "w-full border-collapse",
                weekdays: cn("flex", defaultClassNames.weekdays),
                weekday: cn(
                    "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
                    defaultClassNames.weekday,
                ),
                week: cn("mt-2 flex w-full", defaultClassNames.week),
                week_number_header: cn(
                    "w-(--cell-size) select-none",
                    defaultClassNames.week_number_header,
                ),
                week_number: cn(
                    "text-[0.8rem] text-muted-foreground select-none",
                    defaultClassNames.week_number,
                ),
                day: cn(
                    "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
                    props.showWeekNumber
                        ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
                        : "[&:first-child[data-selected=true]_button]:rounded-l-md",
                    defaultClassNames.day,
                ),
                range_start: cn(
                    "rounded-l-md bg-accent",
                    defaultClassNames.range_start,
                ),
                range_middle: cn(
                    "rounded-none",
                    defaultClassNames.range_middle,
                ),
                range_end: cn(
                    "rounded-r-md bg-accent",
                    defaultClassNames.range_end,
                ),
                today: cn(
                    "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
                    defaultClassNames.today,
                ),
                outside: cn(
                    "text-muted-foreground aria-selected:text-muted-foreground",
                    defaultClassNames.outside,
                ),
                disabled: cn(
                    "text-muted-foreground opacity-50",
                    defaultClassNames.disabled,
                ),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Root: ({ className, rootRef, ...props }) => {
                    return (
                        <div
                            data-slot="calendar"
                            ref={rootRef}
                            className={cn(className)}
                            {...props}
                        />
                    );
                },
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === "left") {
                        return (
                            <ChevronLeftIcon
                                className={cn("size-4", className)}
                                {...props}
                            />
                        );
                    }

                    if (orientation === "right") {
                        return (
                            <ChevronRightIcon
                                className={cn("size-4", className)}
                                {...props}
                            />
                        );
                    }

                    return (
                        <ChevronDownIcon
                            className={cn("size-4", className)}
                            {...props}
                        />
                    );
                },
                Dropdown: ({ value, onChange, options }) => {
                    const [open, setOpen] = React.useState(false);
                    const listRef = React.useRef<HTMLDivElement>(null);
                    const selectedOption = options?.find(
                        (o) => String(o.value) === String(value),
                    );

                    const isYearDropdown = options?.some(
                        (o) => Number(o.value) > 1900,
                    );

                    const sortedOptions = isYearDropdown
                        ? [...(options ?? [])].reverse()
                        : options;

                    React.useEffect(() => {
                        if (open && listRef.current) {
                            const selected = listRef.current.querySelector(
                                "[data-selected='true']",
                            );
                            if (selected) {
                                selected.scrollIntoView({ block: "center" });
                            }
                        }
                    }, [open]);

                    return (
                        <div className="relative">
                            <button
                                type="button"
                                className="flex h-8 items-center gap-1 rounded-md border border-input px-2 text-sm font-medium shadow-xs"
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                {selectedOption?.label ?? value}
                                <ChevronDownIcon className="size-3.5 text-muted-foreground" />
                            </button>
                            {open && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setOpen(false)}
                                    />
                                    <div
                                        ref={listRef}
                                        className="absolute top-full left-0 z-50 mt-1 max-h-60 w-fit min-w-[4rem] overflow-y-auto rounded-md border bg-popover p-1 shadow-md"
                                    >
                                        {sortedOptions?.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                data-selected={
                                                    String(option.value) ===
                                                    String(value)
                                                }
                                                className={cn(
                                                    "block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                                                    String(option.value) ===
                                                        String(value) &&
                                                        "bg-accent text-accent-foreground",
                                                )}
                                                onClick={() => {
                                                    const syntheticEvent = {
                                                        target: {
                                                            value: String(
                                                                option.value,
                                                            ),
                                                        },
                                                    } as React.ChangeEvent<HTMLSelectElement>;
                                                    onChange?.(syntheticEvent);
                                                    setOpen(false);
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                },
                DayButton: CalendarDayButton,
                WeekNumber: ({ children, ...props }) => {
                    return (
                        <td {...props}>
                            <div className="flex size-(--cell-size) items-center justify-center text-center">
                                {children}
                            </div>
                        </td>
                    );
                },
                ...components,
            }}
            {...props}
        />
    );
}

function CalendarDayButton({
    className,
    day,
    modifiers,
    ...props
}: React.ComponentProps<typeof DayButton>) {
    const defaultClassNames = getDefaultClassNames();

    const ref = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected &&
                !modifiers.range_start &&
                !modifiers.range_end &&
                !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
                defaultClassNames.day,
                className,
            )}
            {...props}
        />
    );
}

export { Calendar, CalendarDayButton };
