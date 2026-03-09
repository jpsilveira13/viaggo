/**
 * Viaggo - AI Service (mock)
 * Simula a geração de itinerário com IA
 * No futuro: OpenAI / Claude API
 */
import type {
  TripPlanInput,
  Itinerary,
  ItineraryDay,
  Activity,
} from "../types";

/**
 * Gera um itinerário completo com base no input do usuário
 * (mock: retorna dados simulados com delay)
 */
export async function generateItinerary(
  input: TripPlanInput,
): Promise<Itinerary> {
  // Simula tempo de processamento da IA
  await delay(2500);

  const dayCount = getDayCount(input.startDate, input.endDate);
  const days = generateDays(input, dayCount);

  const totalPerDay = (input.budget.max + input.budget.min) / 2 / dayCount;

  return {
    id: `itin-${Date.now()}`,
    tripId: "",
    days,
    estimatedCost: {
      accommodation: Math.round(totalPerDay * dayCount * 0.35),
      transport: Math.round(totalPerDay * dayCount * 0.15),
      food: Math.round(totalPerDay * dayCount * 0.25),
      activities: Math.round(totalPerDay * dayCount * 0.2),
      other: Math.round(totalPerDay * dayCount * 0.05),
      total: Math.round(totalPerDay * dayCount),
      currency: input.budget.currency,
    },
    tips: generateTips(input.destination),
  };
}

function getDayCount(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(
    1,
    Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)),
  );
}

function generateDays(input: TripPlanInput, dayCount: number): ItineraryDay[] {
  const days: ItineraryDay[] = [];

  for (let i = 0; i < Math.min(dayCount, 7); i++) {
    const date = new Date(input.startDate);
    date.setDate(date.getDate() + i);

    days.push({
      dayNumber: i + 1,
      date: date.toISOString().split("T")[0],
      title: getDayTitle(i, dayCount, input.destination),
      description: getDayDescription(i, dayCount),
      activities: generateActivities(i, input),
    });
  }

  return days;
}

function getDayTitle(
  dayIndex: number,
  total: number,
  destination: string,
): string {
  if (dayIndex === 0) return `Chegada em ${destination}`;
  if (dayIndex === total - 1) return "Dia de partida";
  const titles = [
    "Explorando o centro histórico",
    "Cultura e gastronomia",
    "Aventura e natureza",
    "Day trip arredores",
    "Experiências locais",
    "Dia livre & compras",
  ];
  return titles[(dayIndex - 1) % titles.length];
}

function getDayDescription(dayIndex: number, total: number): string {
  if (dayIndex === 0)
    return "Bem-vindos! Dia de chegada, check-in e primeiras impressões.";
  if (dayIndex === total - 1)
    return "Último dia para aproveitar antes da volta.";
  return "Um dia cheio de experiências incríveis planejadas para vocês.";
}

function generateActivities(
  dayIndex: number,
  input: TripPlanInput,
): Activity[] {
  const baseActivities: Activity[] = [
    {
      id: `act-${dayIndex}-1`,
      time: "09:00",
      title: "Café da manhã",
      description: "Café da manhã no hotel ou cafeteria local.",
      type: "food",
      duration: "1h",
      estimatedCost: 25,
    },
    {
      id: `act-${dayIndex}-2`,
      time: "10:30",
      title: "Visita ao ponto turístico",
      description: `Explore uma das principais atrações de ${input.destination}.`,
      type: "attraction",
      duration: "2h",
      estimatedCost: 30,
      location: { name: input.destination },
    },
    {
      id: `act-${dayIndex}-3`,
      time: "13:00",
      title: "Almoço típico",
      description: "Restaurante com culinária local autêntica.",
      type: "food",
      duration: "1h30",
      estimatedCost: 50,
    },
    {
      id: `act-${dayIndex}-4`,
      time: "15:00",
      title: "Experiência cultural",
      description: "Atividade imersiva na cultura local.",
      type: "experience",
      duration: "2h",
      estimatedCost: 40,
    },
    {
      id: `act-${dayIndex}-5`,
      time: "18:00",
      title: "Tempo livre",
      description: "Explore por conta própria, faça compras ou relaxe.",
      type: "free_time",
      duration: "2h",
    },
    {
      id: `act-${dayIndex}-6`,
      time: "20:00",
      title: "Jantar especial",
      description: "Restaurante recomendado para uma noite inesquecível.",
      type: "food",
      duration: "2h",
      estimatedCost: 80,
    },
  ];

  if (dayIndex === 0) {
    return [
      {
        id: `act-${dayIndex}-0`,
        time: "10:00",
        title: "Chegada ao aeroporto",
        description: `Transfer até o hotel em ${input.destination}.`,
        type: "transport",
        duration: "1h",
        estimatedCost: 40,
        location: { name: `Aeroporto de ${input.destination}` },
      },
      {
        id: `act-${dayIndex}-1`,
        time: "12:00",
        title: "Check-in no hotel",
        description: "Acomodação escolhida no coração da cidade.",
        type: "accommodation",
        duration: "1h",
        estimatedCost: 200,
      },
      ...baseActivities.slice(2),
    ];
  }

  return baseActivities;
}

function generateTips(destination: string): string[] {
  return [
    `Pesquise sobre o clima em ${destination} nas datas da viagem`,
    "Leve um adaptador de tomada universal",
    "Tenha sempre o endereço do hotel anotado offline",
    "Baixe mapas offline do Google Maps",
    "Informe seu banco sobre a viagem internacional",
    "Faça cópias dos documentos importantes",
  ];
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
