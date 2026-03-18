export type RiskLevel = "low" | "medium" | "high";
export type Department = "Оп.риски" | "Надежность" | "Кибербезопасность";
export type AssessmentStatus = "approved" | "in_progress" | "arbitration" | "pending";
export type ConfirmationStatus = "confirmed" | "pending" | "rejected";

export interface Risk {
  id: string;
  name: string;
  level: RiskLevel;
  departments: Department[];
  verdict: string;
  probability: number;
  impact: number;
  reasoning: string;
  factors: string[];
  history?: { version: string; level: RiskLevel; date: string }[];
}

export interface DepartmentAssessment {
  name: Department;
  fullName: string;
  level: RiskLevel;
  risksAssessed: number;
  totalRisks: number;
  confirmed: boolean;
  riskIds: string[];
}

export interface ActionItem {
  id: string;
  description: string;
  responsible: string;
  deadline: string;
  confirmed: boolean;
}

export interface VersionHistory {
  version: string;
  date: string;
  integralRisk: RiskLevel;
  delta: string;
  status: AssessmentStatus;
}

export const agent = {
  name: "Customer Support AI v3.1",
  id: "AGT-2024-00157",
  owner: "Иванов А.С.",
  version: "3.1",
  lastAssessment: "2024-12-15",
  status: "approved" as AssessmentStatus,
};

export const risks: Risk[] = [
  {
    id: "R01", name: "Галлюцинации", level: "high",
    departments: ["Оп.риски", "Кибербезопасность"],
    verdict: "Модель генерирует недостоверные факты в 8% обращений",
    probability: 72, impact: 85,
    reasoning: "Анализ 50 000 диалогов выявил систематическое генерирование недостоверной информации о продуктах и тарифах. Особенно критично при обсуждении юридических условий договоров.",
    factors: ["Недостаточный RAG", "Устаревшая база знаний", "Сложные продукты"],
    history: [
      { version: "3.0", level: "high", date: "2024-11-01" },
      { version: "2.9", level: "high", date: "2024-10-01" },
    ],
  },
  {
    id: "R02", name: "Утечка данных", level: "medium",
    departments: ["Надежность", "Кибербезопасность"],
    verdict: "Обнаружены потенциальные векторы извлечения PII",
    probability: 45, impact: 90,
    reasoning: "При стресс-тестировании модель в ряде случаев раскрывала фрагменты персональных данных из контекста. Риск частично митигирован фильтрами.",
    factors: ["Контекстное окно", "PII в промптах", "Фильтры вывода"],
  },
  {
    id: "R03", name: "Предвзятость", level: "low",
    departments: ["Оп.риски"],
    verdict: "Минимальная предвзятость по демографическим группам",
    probability: 15, impact: 60,
    reasoning: "Аудит bias выявил незначительные отклонения, все метрики в пределах допустимого порога.",
    factors: ["Сбалансированные данные", "Регулярный аудит"],
  },
  {
    id: "R04", name: "Prompt Injection", level: "high",
    departments: ["Кибербезопасность"],
    verdict: "Успешные атаки в 12% тестовых сценариев",
    probability: 65, impact: 80,
    reasoning: "Red team выявил уязвимости к прямым и косвенным prompt injection атакам, включая jailbreak через multi-turn диалоги.",
    factors: ["Прямые инъекции", "Косвенные инъекции", "Multi-turn атаки"],
  },
  {
    id: "R05", name: "Отказ в обслуживании", level: "low",
    departments: ["Надежность"],
    verdict: "Система стабильна при пиковых нагрузках",
    probability: 10, impact: 70,
    reasoning: "Нагрузочное тестирование подтвердило устойчивость при 10x пиковой нагрузке. Auto-scaling настроен корректно.",
    factors: ["Auto-scaling", "Rate limiting", "Circuit breaker"],
  },
  {
    id: "R06", name: "Токсичный контент", level: "medium",
    departments: ["Оп.риски", "Кибербезопасность"],
    verdict: "Фильтры пропускают 3% пограничного контента",
    probability: 35, impact: 65,
    reasoning: "Content safety фильтры работают хорошо для явного контента, но пропускают subtle toxicity и сарказм.",
    factors: ["Subtle toxicity", "Культурный контекст", "Сарказм"],
  },
  {
    id: "R07", name: "Нарушение приватности", level: "medium",
    departments: ["Надежность", "Оп.риски"],
    verdict: "Частичное соответствие политикам обработки данных",
    probability: 40, impact: 75,
    reasoning: "Модель обрабатывает данные в соответствии с основными политиками, однако выявлены пробелы в обработке специальных категорий данных.",
    factors: ["GDPR", "152-ФЗ", "Спец. категории данных"],
  },
  {
    id: "R08", name: "Неконтролируемое поведение", level: "low",
    departments: ["Кибербезопасность"],
    verdict: "Модель следует guardrails в 98% случаев",
    probability: 12, impact: 55,
    reasoning: "Guardrails эффективны. Edge-case сценарии покрыты fallback механизмами.",
    factors: ["Guardrails", "Fallback", "Мониторинг"],
  },
  {
    id: "R09", name: "Ошибки в расчётах", level: "medium",
    departments: ["Оп.риски"],
    verdict: "Неточности при расчёте сложных тарифов",
    probability: 50, impact: 60,
    reasoning: "Модель допускает ошибки при мультивалютных расчётах и сложных тарифных планах.",
    factors: ["Мультивалютность", "Сложные тарифы", "Округление"],
  },
  {
    id: "R10", name: "Манипуляция пользователем", level: "low",
    departments: ["Оп.риски", "Кибербезопасность"],
    verdict: "Минимальный риск манипулятивного поведения",
    probability: 8, impact: 70,
    reasoning: "Тестирование не выявило систематического манипулятивного поведения.",
    factors: ["Этические гайдлайны", "Прозрачность"],
  },
  {
    id: "R11", name: "Зависимость от поставщика", level: "low",
    departments: ["Надежность"],
    verdict: "Мультимодельная архитектура снижает зависимость",
    probability: 20, impact: 50,
    reasoning: "Архитектура поддерживает несколько LLM провайдеров с автоматическим переключением.",
    factors: ["Multi-provider", "Fallback модели"],
  },
  {
    id: "R12", name: "Недоступность сервиса", level: "low",
    departments: ["Надежность"],
    verdict: "SLA 99.9% выполняется",
    probability: 5, impact: 80,
    reasoning: "Резервирование и geo-distribution обеспечивают высокую доступность.",
    factors: ["Geo-distribution", "Резервирование", "Мониторинг"],
  },
  {
    id: "R13", name: "Некорректная эскалация", level: "medium",
    departments: ["Оп.риски"],
    verdict: "15% обращений эскалируются некорректно",
    probability: 55, impact: 45,
    reasoning: "Модель эскалации требует доработки — часть обращений передаётся не в то подразделение.",
    factors: ["Классификация", "Маршрутизация", "Пороги эскалации"],
  },
  {
    id: "R14", name: "Извлечение системного промпта", level: "high",
    departments: ["Кибербезопасность"],
    verdict: "Системный промпт частично извлекаем",
    probability: 60, impact: 55,
    reasoning: "Red team смог извлечь фрагменты системного промпта через специальные техники.",
    factors: ["System prompt leakage", "Обфускация"],
  },
  {
    id: "R15", name: "Нарушение compliance", level: "low",
    departments: ["Оп.риски", "Надежность"],
    verdict: "Основные compliance требования выполнены",
    probability: 15, impact: 85,
    reasoning: "Регуляторные требования в основном выполняются, minor gaps в документации.",
    factors: ["Регуляторика", "Документация", "Аудит"],
  },
  {
    id: "R16", name: "Деградация качества", level: "medium",
    departments: ["Оп.риски", "Надежность"],
    verdict: "Drift модели детектируется с задержкой",
    probability: 40, impact: 55,
    reasoning: "Система мониторинга quality drift требует оптимизации — задержка обнаружения до 48 часов.",
    factors: ["Model drift", "Мониторинг", "Алертинг"],
  },
  {
    id: "R17", name: "Обход ограничений модели", level: "high",
    departments: ["Кибербезопасность"],
    verdict: "Jailbreak успешен в 7% попыток",
    probability: 58, impact: 75,
    reasoning: "Сложные multi-step jailbreak атаки позволяют обойти ограничения модели.",
    factors: ["Multi-step jailbreak", "Role-play атаки", "Encoding tricks"],
  },
  {
    id: "R18", name: "Репутационные риски", level: "low",
    departments: ["УОР"],
    verdict: "Низкий риск при текущем уровне контроля",
    probability: 18, impact: 90,
    reasoning: "Контент-фильтры и мониторинг минимизируют вероятность репутационных инцидентов.",
    factors: ["PR мониторинг", "Контент-фильтры", "Реагирование"],
  },
];

export const departmentAssessments: DepartmentAssessment[] = [
  {
    name: "УОР", fullName: "Управление операционных рисков",
    level: "medium", risksAssessed: 8, totalRisks: 18, confirmed: true,
    riskIds: ["R01", "R03", "R06", "R07", "R09", "R10", "R13", "R15", "R16", "R18"],
  },
  {
    name: "ДТН", fullName: "Дирекция технологической надёжности",
    level: "low", risksAssessed: 6, totalRisks: 18, confirmed: false,
    riskIds: ["R02", "R05", "R07", "R11", "R12", "R15", "R16"],
  },
  {
    name: "AI Red Team", fullName: "Кибербезопасность / AI Red Team",
    level: "high", risksAssessed: 10, totalRisks: 18, confirmed: false,
    riskIds: ["R01", "R02", "R04", "R06", "R08", "R10", "R14", "R17"],
  },
];

export const actionItems: ActionItem[] = [
  { id: "A1", description: "Обновить базу знаний RAG для снижения галлюцинаций", responsible: "Петров Д.И.", deadline: "2025-01-15", confirmed: true },
  { id: "A2", description: "Внедрить дополнительные фильтры PII на выходе модели", responsible: "Сидорова К.М.", deadline: "2025-01-20", confirmed: true },
  { id: "A3", description: "Усилить защиту от prompt injection атак", responsible: "AI Red Team", deadline: "2025-02-01", confirmed: true },
  { id: "A4", description: "Доработать систему эскалации обращений", responsible: "Козлов В.А.", deadline: "2025-02-15", confirmed: false },
  { id: "A5", description: "Оптимизировать мониторинг quality drift", responsible: "Николаева Е.П.", deadline: "2025-03-01", confirmed: false },
];

export const versionHistory: VersionHistory[] = [
  { version: "3.1", date: "2024-12-15", integralRisk: "medium", delta: "−2 высоких риска vs v3.0", status: "approved" },
  { version: "3.0", date: "2024-11-01", integralRisk: "high", delta: "+3 новых риска выявлено", status: "approved" },
  { version: "2.9", date: "2024-09-15", integralRisk: "high", delta: "+1 высокий риск vs v2.8", status: "approved" },
  { version: "2.8", date: "2024-08-01", integralRisk: "medium", delta: "Первичная оценка", status: "approved" },
];

export const riskLevelLabel: Record<RiskLevel, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

export const statusLabel: Record<AssessmentStatus, string> = {
  approved: "Утверждено",
  in_progress: "В процессе",
  arbitration: "Требуется арбитраж",
  pending: "Ожидает",
};
