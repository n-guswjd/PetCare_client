// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

// 1. 유저 정보 (일반 유저 & 병원 계정 기본 데이터)
const dummyUser = {
  id: 1,
  email: "user1@example.com",
  name: "김반려",
  username: "user1",
  phone: "01012345678",
  phoneNumber: "010-1234-5678",
  species: "DOG",
  animalType: "DOG",
  breed: "MALTESE",
  age: 3,
  weight: 4,
  role: "USER",
};

const dummyHospitalUser = {
  id: 777,
  email: "hospital1@example.com",
  name: "행복한 동물병원",
  username: "hospital1",
  phone: "02-123-4567",
  phoneNumber: "02-123-4567",
  role: "HOSPITAL",
};

// Helper: 로그인 유무 검증 함수
const checkIsLoggedIn = (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  return Boolean(authHeader);
};

// Helper: 병원 계정 여부 확인 함수
const checkIsHospital = (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  return authHeader?.includes("hospital-token");
};

// 2. 메타데이터
const dummyAnimalTypes = [
  { code: "DOG", description: "강아지" },
  { code: "CAT", description: "고양이" },
  { code: "OTHER", description: "기타" },
];

const dummyBreeds = [
  { code: "MALTESE", description: "말티즈" },
  { code: "POODLE", description: "푸들" },
  { code: "POMERANIAN", description: "포메라니안" },
  { code: "BICHON", description: "비숑 프리제" },
  { code: "SHIH_TZU", description: "시츄" },
  { code: "KOREAN_SHORT", description: "코리안 숏헤어" },
  { code: "PERSIAN", description: "페르시안" },
  { code: "RAGDOLL", description: "렉돌" },
  { code: "MIX", description: "믹스견" },
];

const dummyDepartments = [
  { code: "VACCINATION", description: "예방접종" },
  { code: "INTERNAL_SURGERY", description: "내과/외과" },
  { code: "DENT_SKIN_EYE", description: "치과/피부과/안과" },
  { code: "NEUTERING", description: "중성화수술" },
  { code: "CHECKUP", description: "건강검진" },
  { code: "EMERGENCY", description: "응급진료" },
  { code: "ORTHO_NEURO_CENTER", description: "정형외과/신경과/중앙클리닉" },
  { code: "OTHER", description: "기타" },
];

// 3. 더미 리뷰 데이터
const dummyReviews = [
  {
    reviewId: 101,
    id: 101,
    hospitalId: 1,
    hospitalName: "행복한 동물의료센터",
    visitDate: "2026-09-20",
    createdDate: "2026-09-20",
    username: "김반려",
    animalType: "강아지",
    breed: "말티즈",
    department: "내과",
    revisitIntention: true,
    content: "원장님이 매우 친절하시고 아이 상태를 꼼꼼하게 봐주셨어요!",
    isMyReview: true,
  },
  {
    reviewId: 102,
    id: 102,
    hospitalId: 1,
    hospitalName: "행복한 동물의료센터",
    visitDate: "2026-09-18",
    createdDate: "2026-09-18",
    username: "박집사",
    animalType: "강아지",
    breed: "푸들",
    department: "예방접종",
    revisitIntention: false,
    content: "시설이 무척 깔끔하고 주차하기 편리해서 자주 찾습니다.",
    isMyReview: false,
  },
  {
    reviewId: 103,
    id: 103,
    hospitalId: 2,
    hospitalName: "아이사랑 동물병원",
    visitDate: "2026-09-15",
    createdDate: "2026-09-15",
    username: "이냥이",
    animalType: "고양이",
    breed: "페르시안",
    department: "안과",
    revisitIntention: true,
    content: "고양이 전용 대기실이 독립되어 있어서 스트레스 없이 진료받았습니다.",
    isMyReview: false,
  },
];

// 4. 병원 데이터
const dummyHospitals = [
  {
    id: 1,
    name: "행복한 동물의료센터",
    address: "서울특별시 강남구 테헤란로 123",
    operatingStatus: "영업중",
    businessStatus: "영업중",
    imageUrl: "https://picsum.photos/400/300?random=1",
    image: "https://picsum.photos/400/300?random=1",
    description: "24시간 응급진료 및 최첨단 수술/검사 장비 보유",
    alt: "행복한 동물의료센터",
    hasParking: true,
    hospitalNumber: "02-123-4567",
    reviewCount: 2,
    animalTypes: ["강아지", "고양이"],
    departments: ["예방접종", "내과/외과", "치과/피부과/안과"],
    breeds: ["말티즈", "푸들", "포메라니안", "코리안 숏헤어"],
    holidays: ["매주 일요일"],
    breakTimes: [],
  },
  {
    id: 2,
    name: "아이사랑 동물병원",
    address: "서울특별시 서초구 서초대로 45",
    operatingStatus: "영업중",
    businessStatus: "영업중",
    imageUrl: "https://picsum.photos/400/300?random=2",
    image: "https://picsum.photos/400/300?random=2",
    description: "고양이 전용 독립 대기실 및 전문 케어 센터",
    alt: "아이사랑 동물병원",
    hasParking: true,
    hospitalNumber: "02-987-6543",
    reviewCount: 1,
    animalTypes: ["고양이"],
    departments: ["치과/피부과/안과"],
    breeds: ["코리안 숏헤어", "페르시안", "렉돌"],
    holidays: ["공휴일"],
    breakTimes: [],
  },
];

// Helper: 리뷰 항목의 고유 ID 정제 함수
const formatReviewResponses = (reviews: typeof dummyReviews, isLoggedIn: boolean) => {
  return reviews.map((review, idx) => {
    const uniqueId = review.reviewId || review.id || Date.now() + idx;
    return {
      ...review,
      reviewId: uniqueId,
      id: uniqueId,
      isMyReview: isLoggedIn ? Boolean(review.isMyReview) : false,
    };
  });
};

export const handlers = [
  // 1. Auth & User
  http.post("*/api/v1/auth/login", async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as any;
    
    // 들어오는 모든 값(아이디, 이메일 등)을 하나로 합쳐서 키워드 검색
    const inputString = JSON.stringify(body).toLowerCase();

    // 입력값에 'hospital'이 들어가면 무조건 병원 계정으로 로그인 처리
    const isHospitalLogin = inputString.includes("hospital");

    const token = isHospitalLogin ? "mock-hospital-token-7777" : "mock-jwt-token-12345";
    const userToReturn = isHospitalLogin ? dummyHospitalUser : dummyUser;

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }

    return HttpResponse.json({
      token,
      user: userToReturn,
    });
  }),

  // 일반 회원가입 API 핸들러
  http.post("*/api/v1/auth/signup", async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    return HttpResponse.json({
      success: true,
      message: "회원가입이 완료되었습니다.",
      data: body,
    });
  }),

  // 병원 회원가입 API 핸들러
  http.post("*/api/v1/hospital/auth/signup", async () => {
    return HttpResponse.json({
      success: true,
      message: "병원 등록 요청이 완료되었습니다.",
    });
  }),

  http.post("*/api/v1/auth/logout", () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    return HttpResponse.json({
      success: true,
      message: "로그아웃 되었습니다.",
    });
  }),

  http.get("*/api/v1/auth/me", ({ request }) => {
    if (!checkIsLoggedIn(request)) {
      return new HttpResponse(
        JSON.stringify({ message: "로그인이 필요한 서비스입니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const user = checkIsHospital(request) ? dummyHospitalUser : dummyUser;
    return HttpResponse.json(user);
  }),

  http.patch("*/api/v1/auth/me", async ({ request }) => {
    const body = await request.json();
    const currentUser = checkIsHospital(request) ? dummyHospitalUser : dummyUser;
    Object.assign(currentUser, body as object);
    return HttpResponse.json(currentUser);
  }),

  http.get("*/api/v1/auth/check-phone", () => {
    return HttpResponse.json({ isAvailable: true });
  }),

  // 2. Hospital
  http.get("*/api/v1/hospitals/recommended", () => {
    return HttpResponse.json(dummyHospitals[0]);
  }),
  http.get("*/api/v1/hospitals/top", () => {
    return HttpResponse.json(dummyHospitals);
  }),
  http.get("*/api/v1/hospitals/search", ({ request }) => {
    const url = new URL(request.url);
    const keyword =
      url.searchParams.get("keyword") || url.searchParams.get("query") || "";

    if (!keyword.trim()) {
      return HttpResponse.json(dummyHospitals);
    }

    const filteredHospitals = dummyHospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(keyword.toLowerCase()) ||
        hospital.address.toLowerCase().includes(keyword.toLowerCase()),
    );

    return HttpResponse.json(filteredHospitals);
  }),
  http.get("*/api/v1/hospital/:id", ({ params }) => {
    const hospital =
      dummyHospitals.find((h) => h.id === Number(params.id)) ||
      dummyHospitals[0];
    return HttpResponse.json(hospital);
  }),
  http.get("*/api/v1/hospitals", () => {
    return HttpResponse.json(dummyHospitals);
  }),

  // 3. Metadata
  http.get("*/api/v1/animal-types", () => {
    return HttpResponse.json({ types: dummyAnimalTypes });
  }),
  http.get("*/api/v1/departments", () => {
    return HttpResponse.json({ departments: dummyDepartments });
  }),
  http.get("*/api/v1/breeds/*", () => {
    return HttpResponse.json({ breeds: dummyBreeds });
  }),
  http.get("*/api/v1/breeds", () => {
    return HttpResponse.json({ breeds: dummyBreeds });
  }),

  // 4. Reservations
  http.get("*/api/v1/reservations/:hospitalId/available-times", () => {
    return HttpResponse.json({
      availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    });
  }),
  http.get("*/api/v1/reservations/hospital/:id", () => {
    return HttpResponse.json(null);
  }),
  http.get("*/api/v1/reservations", () => {
    return HttpResponse.json([]);
  }),
  http.post("*/api/v1/reservations", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      message: "예약이 완료되었습니다.",
      data: body,
    });
  }),

  // 5. Reviews
  http.get("*/api/v1/reviews/form/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      reservationId: Number(id) || 1,
      hospitalName: "행복한 동물의료센터",
      hospitalAddress: "서울특별시 강남구 테헤란로 123",
      visitDate: "2026-09-25",
      animalType: "강아지",
      breed: "말티즈",
      department: "VACCINATION",
    });
  }),

  http.get("*/api/v1/reviews/check-available", () => {
    return HttpResponse.json(1);
  }),

  // 내 리뷰 목록
  http.get("*/api/v1/reviews/my", ({ request }) => {
    const isLoggedIn = checkIsLoggedIn(request);
    if (!isLoggedIn) {
      return new HttpResponse(
        JSON.stringify({ message: "로그인이 필요합니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const myReviews = dummyReviews.filter((r) => r.isMyReview);
    return HttpResponse.json(formatReviewResponses(myReviews, true));
  }),

  // 병원별 리뷰 목록
  http.get("*/api/v1/reviews/hospital/:id", ({ request, params }) => {
    const isLoggedIn = checkIsLoggedIn(request);
    const hospitalId = Number(params.id);
    const filteredReviews = dummyReviews.filter(
      (r) => r.hospitalId === hospitalId,
    );
    const targetList =
      filteredReviews.length > 0 ? filteredReviews : dummyReviews;

    return HttpResponse.json(formatReviewResponses(targetList, isLoggedIn));
  }),

  // 인기/전체 리뷰 목록
  http.get("*/api/v1/reviews/top", ({ request }) => {
    const isLoggedIn = checkIsLoggedIn(request);
    return HttpResponse.json(formatReviewResponses(dummyReviews, isLoggedIn));
  }),

  http.get("*/api/v1/reviews", ({ request }) => {
    const isLoggedIn = checkIsLoggedIn(request);
    return HttpResponse.json(formatReviewResponses(dummyReviews, isLoggedIn));
  }),

  // 리뷰 작성 POST
  http.post("*/api/v1/reviews", async ({ request }) => {
    if (!checkIsLoggedIn(request)) {
      return new HttpResponse(
        JSON.stringify({ message: "로그인이 필요한 서비스입니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = (await request.json()) as any;
    const today = new Date().toISOString().split("T")[0];
    const newId = Date.now();

    const departmentMap: Record<string, string> = {
      VACCINATION: "예방접종",
      INTERNAL_SURGERY: "내과/외과",
      DENT_SKIN_EYE: "치과/피부과/안과",
      NEUTERING: "중성화수술",
      CHECKUP: "건강검진",
      EMERGENCY: "응급진료",
      ORTHO_NEURO_CENTER: "정형외과/신경과/중앙클리닉",
      OTHER: "기타",
    };

    const newReview = {
      reviewId: newId,
      id: newId,
      hospitalId: 1,
      hospitalName: "행복한 동물의료센터",
      visitDate: today,
      createdDate: today,
      username: dummyUser.name,
      animalType: "강아지",
      breed: "말티즈",
      department: departmentMap[body.department] || "예방접종",
      revisitIntention: body.revisitIntention === "yes",
      content: body.content,
      isMyReview: true,
    };

    dummyReviews.unshift(newReview);
    return HttpResponse.json({
      success: true,
      message: "리뷰가 등록되었습니다.",
      data: newReview,
    });
  }),

  // 리뷰 삭제 DELETE
  http.delete("*/api/v1/reviews/:id", ({ request, params }) => {
    if (!checkIsLoggedIn(request)) {
      return new HttpResponse(
        JSON.stringify({ message: "로그인이 필요한 서비스입니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const id = Number(params.id);
    const index = dummyReviews.findIndex(
      (r) => r.reviewId === id || r.id === id
    );

    if (index !== -1) {
      if (!dummyReviews[index].isMyReview) {
        return new HttpResponse(
          JSON.stringify({ message: "본인이 작성한 리뷰만 삭제할 수 있습니다." }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
      dummyReviews.splice(index, 1);
    }

    return HttpResponse.json({
      success: true,
      message: "리뷰가 성공적으로 삭제되었습니다.",
    });
  }),

  // 6. Catch-All
  http.all("*/api/v1/*", ({ request }) => {
    console.warn(`[MSW Unhandled API]: ${request.method} ${request.url}`);
    return HttpResponse.json([]);
  }),
];