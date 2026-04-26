import type { SchemaObject } from "@/lib/schema";

type Props = {
  data: SchemaObject | SchemaObject[];
  id?: string;
  nonce?: string;
};

export default function SchemaMarkup({ data, id, nonce }: Props) {
  const payload = Array.isArray(data) ? data : [data];
  // Escape `<` so a stray `</script>` in any future user-derived input can't
  // close the tag early. Inputs today are all build-time literals; this is
  // belt-and-suspenders.
  const json = JSON.stringify(payload.length === 1 ? payload[0] : payload).replace(
    /</g,
    "\\u003c",
  );
  return (
    <script
      type="application/ld+json"
      id={id}
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
