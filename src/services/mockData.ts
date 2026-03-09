/**
 * Viaggo - Mock Data
 * Dados simulados para desenvolvimento do MVP
 */
import type { Agent, Trip, Itinerary, Conversation, Proposal } from "../types";

// ============================================================
// AGENTS
// ============================================================
export const mockAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Ana Rodrigues",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    agency: "Viaje Bem Turismo",
    bio: "Especialista em viagens pela Europa com mais de 10 anos de experiência. Adoro criar roteiros personalizados que combinam cultura, gastronomia e experiências únicas.",
    specialties: ["Europa", "Lua de mel", "Cultural"],
    destinations: ["Portugal", "Itália", "França", "Espanha", "Grécia"],
    rating: 4.9,
    reviewCount: 234,
    responseTime: "~30min",
    verified: true,
    email: "ana@viajebem.com",
    whatsapp: "+5511999998888",
  },
  {
    id: "agent-2",
    name: "Carlos Santos",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    agency: "Mundo Travel",
    bio: "Apaixonado por aventura e natureza. Crio experiências para quem quer sair da zona de conforto e explorar o mundo de forma autêntica.",
    specialties: ["Aventura", "Natureza", "Mochilão"],
    destinations: ["Nova Zelândia", "Chile", "Peru", "Islândia", "Noruega"],
    rating: 4.8,
    reviewCount: 187,
    responseTime: "~1h",
    verified: true,
    email: "carlos@mundotravel.com",
    whatsapp: "+5511988887777",
  },
  {
    id: "agent-3",
    name: "Marina Costa",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    agency: "Dream Destinations",
    bio: "Sou especialista em viagens de luxo e experiências exclusivas. Cada roteiro é cuidadosamente planejado para superar expectativas.",
    specialties: ["Luxo", "Resorts", "Gastronomia"],
    destinations: ["Maldivas", "Dubai", "Japão", "Tailândia", "Bali"],
    rating: 4.95,
    reviewCount: 156,
    responseTime: "~2h",
    verified: true,
    email: "marina@dreamdest.com",
    whatsapp: "+5511977776666",
  },
  {
    id: "agent-4",
    name: "Pedro Lima",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    agency: "Trilha & Cia",
    bio: "Guia de turismo certificado com foco em ecoturismo e turismo sustentável. Conheço os melhores cantos escondidos do Brasil e América do Sul.",
    specialties: ["Ecoturismo", "Nacional", "Trilhas"],
    destinations: [
      "Chapada Diamantina",
      "Fernando de Noronha",
      "Patagônia",
      "Amazônia",
    ],
    rating: 4.7,
    reviewCount: 98,
    responseTime: "~45min",
    verified: false,
    email: "pedro@trilhaecia.com",
  },
  {
    id: "agent-5",
    name: "Juliana Ferreira",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    agency: "Family Trips BR",
    bio: "Mãe de 3 e agente de viagem! Entendo perfeitamente as necessidades de quem viaja com família. Roteiros seguros, divertidos e sem estresse.",
    specialties: ["Família", "Disney", "Cruzeiros"],
    destinations: ["Orlando", "Cancún", "Lisboa", "Buenos Aires"],
    rating: 4.85,
    reviewCount: 312,
    responseTime: "~20min",
    verified: true,
    email: "juliana@familytrips.com",
    whatsapp: "+5511966665555",
  },
];

// ============================================================
// TRIPS (exemplo de trip do user)
// ============================================================
export const mockTrips: Trip[] = [
  {
    id: "trip-1",
    userId: "user-1",
    status: "itinerary_ready",
    input: {
      destination: "Lisboa, Portugal",
      destinationCountry: "Portugal",
      startDate: "2026-04-15",
      endDate: "2026-04-22",
      budget: { min: 5000, max: 12000, currency: "BRL" },
      travelers: { adults: 2, children: 0, infants: 0, type: "couple" },
      travelStyles: ["cultural", "gastronomy", "romantic"],
      pace: "moderate",
    },
    itinerary: {
      id: "itin-1",
      tripId: "trip-1",
      days: [
        {
          dayNumber: 1,
          date: "2026-04-15",
          title: "Chegada em Lisboa",
          description:
            "Bem-vindos a Lisboa! Dia de chegada e primeiras impressões.",
          activities: [
            {
              id: "act-1",
              time: "10:00",
              title: "Chegada ao Aeroporto de Lisboa",
              description:
                "Transfer do aeroporto até o hotel no centro histórico.",
              type: "transport",
              estimatedCost: 35,
              duration: "30min",
              location: { name: "Aeroporto Humberto Delgado" },
            },
            {
              id: "act-2",
              time: "11:30",
              title: "Check-in no Hotel",
              description:
                "Hotel boutique no coração do Chiado, com vista para o Tejo.",
              type: "accommodation",
              estimatedCost: 180,
              duration: "1h",
              location: {
                name: "Hotel Chiado",
                address: "Rua do Chiado, Lisboa",
              },
            },
            {
              id: "act-3",
              time: "13:00",
              title: "Almoço no Time Out Market",
              description:
                "Mercado gastronômico com o melhor da cozinha portuguesa. Prove os pastéis de Belém e bacalhau.",
              type: "food",
              estimatedCost: 50,
              duration: "1h30",
              location: {
                name: "Time Out Market",
                address: "Av. 24 de Julho, Lisboa",
              },
            },
            {
              id: "act-4",
              time: "15:00",
              title: "Passeio pelo Bairro Alto & Chiado",
              description:
                "Caminhe pelas ruas charmosas, lojas de design português e cafés históricos.",
              type: "attraction",
              duration: "2h30",
              location: { name: "Bairro Alto" },
            },
            {
              id: "act-5",
              time: "18:30",
              title: "Pôr do sol no Miradouro da Graça",
              description:
                "Um dos melhores miradouros de Lisboa com vista panorâmica da cidade.",
              type: "attraction",
              duration: "1h",
              location: { name: "Miradouro da Graça" },
            },
            {
              id: "act-6",
              time: "20:30",
              title: "Jantar com Fado",
              description:
                "Experiência autêntica de fado em restaurante típico no bairro de Alfama.",
              type: "food",
              estimatedCost: 80,
              duration: "2h",
              location: { name: "Tasca do Chico", address: "Alfama, Lisboa" },
            },
          ],
        },
        {
          dayNumber: 2,
          date: "2026-04-16",
          title: "Belém & Cultura",
          description: "Dia dedicado à zona de Belém, patrimônio e doces.",
          activities: [
            {
              id: "act-7",
              time: "09:00",
              title: "Café da manhã no hotel",
              description: "Buffet português com queijos, presuntos e pastéis.",
              type: "food",
              duration: "1h",
            },
            {
              id: "act-8",
              time: "10:30",
              title: "Torre de Belém",
              description:
                "Patrimônio UNESCO e símbolo dos Descobrimentos Portugueses.",
              type: "attraction",
              estimatedCost: 10,
              duration: "1h",
              location: { name: "Torre de Belém" },
            },
            {
              id: "act-9",
              time: "12:00",
              title: "Mosteiro dos Jerónimos",
              description:
                "Obra-prima do estilo manuelino, patrimônio mundial da UNESCO.",
              type: "attraction",
              estimatedCost: 10,
              duration: "1h30",
              location: { name: "Mosteiro dos Jerónimos" },
            },
            {
              id: "act-10",
              time: "13:30",
              title: "Pastéis de Belém",
              description:
                "A fábrica original desde 1837. Obrigatório provar o pastel de nata!",
              type: "food",
              estimatedCost: 15,
              duration: "30min",
              location: { name: "Pastéis de Belém" },
            },
            {
              id: "act-11",
              time: "15:00",
              title: "MAAT - Museu de Arte e Tecnologia",
              description:
                "Museu de arquitetura incrível à beira do Tejo com exposições contemporâneas.",
              type: "attraction",
              estimatedCost: 12,
              duration: "2h",
              location: { name: "MAAT" },
            },
            {
              id: "act-12",
              time: "18:00",
              title: "Tarde livre",
              description:
                "Tempo livre para explorar por conta própria ou descansar.",
              type: "free_time",
              duration: "2h",
            },
            {
              id: "act-13",
              time: "20:30",
              title: "Jantar no Cervejaria Ramiro",
              description:
                "O melhor marisco de Lisboa! Imperdível para amantes de frutos do mar.",
              type: "food",
              estimatedCost: 70,
              duration: "2h",
              location: { name: "Cervejaria Ramiro" },
            },
          ],
        },
        {
          dayNumber: 3,
          date: "2026-04-17",
          title: "Sintra Encantada",
          description:
            "Day trip para a mágica vila de Sintra, patrimônio UNESCO.",
          activities: [
            {
              id: "act-14",
              time: "08:30",
              title: "Trem para Sintra",
              description:
                "Partida da Estação do Rossio. Viagem de ~40min com belas paisagens.",
              type: "transport",
              estimatedCost: 5,
              duration: "40min",
              location: { name: "Estação do Rossio" },
            },
            {
              id: "act-15",
              time: "10:00",
              title: "Palácio da Pena",
              description:
                "Palácio colorido no topo da serra, um dos castelos mais bonitos da Europa.",
              type: "attraction",
              estimatedCost: 14,
              duration: "2h",
              location: { name: "Palácio da Pena, Sintra" },
            },
            {
              id: "act-16",
              time: "12:30",
              title: "Almoço em Sintra",
              description:
                "Restaurante típico na vila com cozinha portuguesa regional.",
              type: "food",
              estimatedCost: 40,
              duration: "1h",
              location: { name: "Vila de Sintra" },
            },
            {
              id: "act-17",
              time: "14:00",
              title: "Quinta da Regaleira",
              description:
                "Jardins misteriosos com o famoso poço iniciático. Lugar mágico e fotogênico.",
              type: "attraction",
              estimatedCost: 10,
              duration: "2h",
              location: { name: "Quinta da Regaleira" },
            },
            {
              id: "act-18",
              time: "16:30",
              title: "Travesseiros de Sintra",
              description:
                "Doce típico de Sintra na famosa Piriquita. Tradição desde 1862.",
              type: "food",
              estimatedCost: 8,
              duration: "30min",
              location: { name: "Casa Piriquita" },
            },
            {
              id: "act-19",
              time: "17:30",
              title: "Retorno a Lisboa",
              description: "Trem de volta a Lisboa para descansar no hotel.",
              type: "transport",
              estimatedCost: 5,
              duration: "40min",
            },
          ],
        },
      ],
      estimatedCost: {
        accommodation: 1260,
        transport: 280,
        food: 890,
        activities: 420,
        other: 200,
        total: 3050,
        currency: "EUR",
      },
      tips: [
        "Compre o Lisboa Card para transporte ilimitado e entrada em museus",
        "Use sapatos confortáveis — Lisboa é cheia de ladeiras!",
        "Reserve o jantar com Fado com antecedência",
        "O elétrico 28 é turístico mas vale a experiência",
        "Experimente a ginjinha no Rossio",
      ],
    },
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:30:00Z",
  },
];

// ============================================================
// PROPOSALS
// ============================================================
export const mockProposals: Proposal[] = [
  {
    id: "prop-1",
    tripId: "trip-1",
    agentId: "agent-1",
    agent: mockAgents[0],
    status: "received",
    totalPrice: 8500,
    currency: "BRL",
    message:
      "Olá! Analisei o itinerário e ficou incrível. Consigo fazer tudo isso com hospedagem em hotel 4 estrelas no Chiado. Incluo transfer privado e guia em Sintra.",
    includes: [
      "Hotel 4★ com café da manhã",
      "Transfer aeroporto (ida e volta)",
      "Tour guiado em Sintra",
      "Jantar com Fado incluso",
      "Seguro viagem",
    ],
    excludes: [
      "Passagens aéreas",
      "Refeições não mencionadas",
      "Despesas pessoais",
    ],
    validUntil: "2026-03-15",
    createdAt: "2026-03-02T14:00:00Z",
  },
  {
    id: "prop-2",
    tripId: "trip-1",
    agentId: "agent-5",
    agent: mockAgents[4],
    status: "received",
    totalPrice: 7200,
    currency: "BRL",
    message:
      "Oi! Adorei o roteiro de vocês! Tenho um parceiro em Lisboa que oferece um hotel boutique incrível no Bairro Alto com desconto especial.",
    includes: [
      "Hotel boutique 3★ superior",
      "Transfer compartilhado",
      "Lisboa Card (7 dias)",
      "Seguro viagem",
    ],
    excludes: ["Passagens aéreas", "Refeições", "Entradas em atrações"],
    validUntil: "2026-03-20",
    createdAt: "2026-03-03T09:00:00Z",
  },
];

// ============================================================
// CONVERSATIONS
// ============================================================
export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    tripId: "trip-1",
    userId: "user-1",
    agentId: "agent-1",
    agent: mockAgents[0],
    lastMessage: {
      id: "msg-3",
      conversationId: "conv-1",
      senderId: "agent-1",
      senderType: "agent",
      content: "Enviei a proposta! Qualquer dúvida estou aqui 😊",
      type: "text",
      timestamp: "2026-03-02T14:05:00Z",
      read: false,
    },
    unreadCount: 1,
    createdAt: "2026-03-02T10:00:00Z",
  },
  {
    id: "conv-2",
    tripId: "trip-1",
    userId: "user-1",
    agentId: "agent-5",
    agent: mockAgents[4],
    lastMessage: {
      id: "msg-5",
      conversationId: "conv-2",
      senderId: "agent-5",
      senderType: "agent",
      content: "Boa noite! Preparei uma proposta especial pra vocês.",
      type: "text",
      timestamp: "2026-03-03T09:05:00Z",
      read: true,
    },
    unreadCount: 0,
    createdAt: "2026-03-03T08:00:00Z",
  },
];
