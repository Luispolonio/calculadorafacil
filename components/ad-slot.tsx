import { AdHorizontal, AdVertical } from "@/components/ads";

/**
 * Compatibilidad con el antiguo marcador de anuncios.
 * Delega en las unidades reales de AdSense.
 */
export default function AdSlot({
  format = "responsive",
}: {
  placement: string;
  format?: "leaderboard" | "rectangle" | "responsive";
}) {
  return format === "rectangle" ? <AdVertical /> : <AdHorizontal />;
}
