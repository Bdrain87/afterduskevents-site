import type { SchemaObject } from "@/lib/schema";

type Props = {
  data: SchemaObject | SchemaObject[];
  id?: string;
};

export default function SchemaMarkup({ data, id }: Props) {
  const payload = Array.isArray(data) ? data : [data];
  const json = JSON.stringify(payload.length === 1 ? payload[0] : payload);
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
