import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

/**
 * Projector-bulb expand indicator: a steel-ringed circle that ignites in
 * ember when the accordion row opens. Replaces the default chevron for
 * an on-brand cinema feel. The bulb scales from 0.6 → 1 and crossfades
 * from steel → ember via aria-expanded state (CSS-only).
 */
function ProjectorBulb() {
  return (
    <span
      data-slot="accordion-trigger-icon"
      aria-hidden="true"
      className="relative ml-auto flex h-4 w-4 shrink-0 items-center justify-center"
    >
      <span className="absolute inset-0 rounded-full border border-steel/60 transition-colors group-aria-expanded/accordion-trigger:border-ember" />
      <span className="block h-1.5 w-1.5 rounded-full bg-steel/60 transition-all duration-300 group-aria-expanded/accordion-trigger:h-2.5 group-aria-expanded/accordion-trigger:w-2.5 group-aria-expanded/accordion-trigger:bg-ember group-aria-expanded/accordion-trigger:shadow-[0_0_12px_rgba(221,84,84,0.65)]" />
    </span>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-4 rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ProjectorBulb />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
