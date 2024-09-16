import {
  GET_TOKEN,
  VALIDATE_SESSION,
  LOG_OUT,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  GET_ALL_MENTORS,
  GET_ALL_MENTORS_TOP,
  ORDER_BY_PRICE,
  ORDER_BY_NAME,
  GET_COMMENTS,
  POST_COMMENT,
  UPDATE_COMMENT_BY_ID,
  DELETE_COMMENT_BY_ID,
  GET_USERS,
  GET_USER_BY_ID,
  LOGIN_PROFILE,
  SHOW_LIKES,
  FILTER_BY_NAME,
  FILTER_BY_CATEGORY,
  FILTER_BY_SKILLS,
  FILTER_BY_PRICE_RANGE,
  REDIRECT_TOKEN,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILURE
} from "../actions/types";

let initialState = {
  access: { state: false, ref: "" },
  allMentors: [],
  allMentorsCopy: [],
  allMentorsPrice: [],
  categories: [],
  skills: [],
  filteredMentor: [],
  details: [],
  mentorsTop: [],
  comments: [],
  response: {},
  users: [],
  userDetail: [],
  loginProfile: false,
  showLikes: false,
  user: null,
  loading: false,
  error: null,
  token: "",
};

const reducer = (state = initialState, { type, payload }) => {
  //let filter;
  switch (type) {
    //----------------------------MentorS-----------------------------------
    case GET_ALL_MENTORS: {
      let mentors = payload.filter(user => user.role === "mentor");
      return {
        ...state,
        allMentors: mentors,
        allMentorsCopy: mentors,
      };
    }
    case GET_ALL_MENTORS_TOP: {
      let tops = payload.filter(user => user.top === true);
      return {
        ...state,
        mentorsTop: tops
      };
    }

    //-----------------------GOOGLE---------------------
    case LOGIN_GOOGLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case LOGIN_GOOGLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    //----------------------------FILTERS-------------------
    case "RESET_FILTER":
      return {
        ...state,
        allMentorsCopy: state.allMentors,
      };
    case "RESET_SKILL_FILTER":
      return {
        ...state,
        allMentorsCopy: state.allMentors,
      };
    case FILTER_BY_CATEGORY: {
      let mentorsFilter = state.allMentorsCopy.filter(mentor =>
        mentor.category[0] === payload
      )
      return {
        ...state,
        allMentorsCopy: mentorsFilter
      };
    }
    case FILTER_BY_SKILLS:
      return {
        ...state,
        allMentorsCopy: state.allMentors.filter(mentor =>
          payload.every(skill => mentor.skills.includes(skill))
        ),
      };

    case FILTER_BY_NAME:
      if (payload === "ALL")
        return {
          ...state,
          allMentorsCopy: payload,
        };
      return {
        ...state,
        allMentorsCopy: payload,
      };
    case FILTER_BY_PRICE_RANGE:
      return {
        ...state,
        allMentorsCopy: state.allMentors.filter(mentor => {
          const [minPrice, maxPrice] = payload; // valores del rango de precios que llegan
          const mentorMinPrice = mentor.pricing[0]; // precio mínimo del mentor
          const mentorMaxPrice = mentor.pricing[mentor.pricing.length - 1]; // precio máximo del mentor (último valor)

          // Verificar que los precios del mentor estén dentro del rango proporcionado
          return mentorMinPrice >= minPrice && mentorMaxPrice <= maxPrice;
        }),
      };


    //----------------------------ORDER-------------------
    case ORDER_BY_PRICE: {
      let orderedMentorPrice = [...state.allMentorsCopy];
      if (payload === "A") {
        //ascendente mayor
        orderedMentorPrice = orderedMentorPrice.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }
          if (b.price > a.price) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "D") {
        //desendente menor
        orderedMentorPrice = orderedMentorPrice.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          }
          if (b.price > a.price) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        allMentorsCopy: orderedMentorPrice,
      };
    }
    case ORDER_BY_NAME: {
      let orderedMentorName = [...state.allMentorsCopy];
      if (payload === "A") {
        //ascendente mayor
        orderedMentorName = orderedMentorName.sort((a, b) => {
          if (a.first_name > b.first_name) {
            return 1;
          }
          if (b.first_name > a.first_name) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "D") {
        //desendente menor
        orderedMentorName = orderedMentorName.sort((a, b) => {
          if (a.first_name > b.first_name) {
            return -1;
          }
          if (b.first_name > a.first_name) {
            return 1;
          }
        });
      }
      return {
        ...state,
        allMentorsCopy: orderedMentorName,
      };
    }
    //----------------------------COMMETS--------------------
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case POST_COMMENT:
      return {
        ...state,
        comments: [...state.allMentors, payload],
      };
    case UPDATE_COMMENT_BY_ID:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === payload.id ? payload : comment
        ),
      };
    case DELETE_COMMENT_BY_ID:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== payload),
      };
    //-----------------------------------------USER--------------------------------

    case ADD_FAVORITE:
      return {
        ...state,
        userDetail: payload,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        userDetail: payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload.detail,
        totalUsers: payload.detail.totalUsers,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: payload.detail,
      };
    case LOGIN_PROFILE:
      return {
        ...state,
        loginProfile: !payload,
      };
    case SHOW_LIKES:
      return {
        ...state,
        showLikes: payload,
      };

    case GET_TOKEN:
      return {
        ...state,
        //sin respuesta al estado
      };

    case VALIDATE_SESSION:
      return {
        ...state,
        //sin respuesta al estado
      };

    case LOG_OUT:
      return {
        ...state,
        userDetail: payload,
      };

    case REDIRECT_TOKEN:
      return {
        ...state,
        token: payload,
      };
    default:
      return { ...state };
  }
};
export default reducer;
