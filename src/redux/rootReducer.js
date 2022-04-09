import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import * as auth from "../app/modules/Auth/_redux/authRedux";
import {
  giftSelectActiveCategorisList,
  gift_select_Reducer_categories
} from "./gift/gift_category_select";
import {
  gift_select_cashAggregated_Reducer,
  giftSelectCashAggregated
} from "./gift/gift_select_giftCashAggregated";
import {
  gift_select_aggregated_Reducer,
  giftSelectAggregated
} from "./gift/gift_select_aggregated";
import {
  giftSelectActiveSubCategoryList,
  gift_select_Reducer_subCategories
} from "./gift/gift_subCategory_select";
import { EMPTYALLREDUCERS } from "./type";
import { reducer_notificationAlert } from "./notificationAlert";
import { select_bonus_reducer, selectBonus } from "./bonus/select_bonus";
import {
  select_bonus_management_reducer,
  selectBonusManagement
} from "./bonus/select_bonus_management";

import { select_notify_reducer, selectNotify } from "./notify/select_nofify";
import {
  education_insert_Reducer_newCourse,
  educationInsertNewCourse
} from "./education/education_newCourse_insert/index";
import {
  education_course_select_Reducer,
  education_course_select_worker
} from "./education/education_course_select";
import {
  education_course_insert_Reducer,
  education_course_insert_worker
} from "./education/education_course_insert";
import {
  education_profile_select_worker,
  education_profile_select_Reducer
} from "./education/education_registration_profile";
import {
  course_select_registration,
  education_select_registration
} from "./education/education_course_select_registrations";
import {
  educationalVideoStatic,
  educationalVideo_select_static_Reducer
} from "./static/educatinal_videos/videos_select";
import {
  club_member_Reducer,
  clubmemberSelect
} from "./clubmember/clubmember_select_common";
import {
  select_clubmember_reducer,
  selecClubmember
} from "./clubmember/clubmember_select";
import {
  select_clubmember_profile_picture_reducer,
  selecClubmemberProfilePicture
} from "./clubmember/clubmember_select_profile_picture";
import {
  select_clubmember_introducing_member_id_reducer,
  selecClubmemberIntroducingMemberId
} from "./clubmember/clubmember_select_introducing_member_id";
import {
  select_clubmember_with_profile_picture_reducer,
  selecClubmemberWithProfilePicture
} from "./clubmember/clubmember_select_with_profile_picture";
import { select_summaries_Reducer, selectSummaries } from "./summaries";
import {
  selectPortfolioDaily,
  select_portfolio_daily_reducer
} from "./../redux/stock/select_portfolio_daily";
import {
  select_stock_details_reducer,
  selectStockDetails
} from "./../redux/stock/select_stock_details";
import {
  select_member_remain_reducer,
  selectMemberRemain
} from "./../redux/stock/select_member_remain/index";

import {
  select_bonus_requests_reducer,
  selectBonusRequests
} from "./bonus/select_bonus_requests";
import {
  select_bouns_aggregated_reducer,
  selectBounsAggregated
} from "./bonus/select_bouns_aggregated";
import {
  compatition_select_reducer,
  CompatitionSelectActive
} from "./Compatition/compatition_select";
import {
  compatition_select_in_range_reducer,
  CompatitionSelectInRange
} from "./Compatition/compatition_select_in_range";
import {
  CompatitionSelectParticipations,
  compatition_select_participation_reducer
} from "./Compatition/compatition_select_participations";
import {
  performanceSelectById,
  performance_select_by_id_reducer
} from "./Compatition/performance_select_by_id";
import {
  competitions_profile_reducer,
  compatitionProfileSelect
} from "./Compatition/compatition_profile_select";

import { giftSelectList, gift_select_Reducer } from "./gift/gift_select";

import {
  person_v1_profile_picture,
  personProfilePicture
} from "./person/person_v1_select_Integrate_profiles";
import { orders_v1_select, ordersSelect } from "./Orders/orders_v1_select";
import {
  select_OerdersAggregated_reducer,
  selecOerdersAggregated
} from "./Orders/orders_v1_select_Aggregated";
import {
  select_OerdersDetailes_reducer,
  selecOerdersDetailes
} from "./Orders/orders_v1_select_tableDetailes";
import {
  select_StepByStepDiscount_reducer,
  selecStepByStepDiscount
} from "./Orders/oerders_v1_select_stepByStepDiscount";
import {
  ipoList_select_Registered_reducer,
  ipoListSelectRegistered
} from "./ipoList/ipoList_select registered";
import {
  ipoList_select_reducer,
  ipoListSelect
} from "./ipoList/ipoList_select";

import {
  select_login_list_reducer,
  selectLoginList
} from "./clubmember/clubmember_select_login_list/index";
import { excel_select_reducer, excelSelect } from "./Excel";
import {
  reducer_get_kyc_profile,
  workerclubmember_with_profile_picture_reducer
} from "./clubmember/clubmember_select_get_kyc_profile/index";

import { faq_select_reducer, selectFaq } from "../redux/content/faq/faq_select";
import {
  faq_select_category_reducer,
  selectFaqCategory
} from "./content/faq/faq_select_category";
import {
  changeBroker_select_reducer,
  selectChangeBroker
} from "../redux/clubmember/changeBroker_select";
import {
  selectSummariesSearch,
  select_summaries_search_Reducer
} from "./summaries_search";
import { goverment_select_reducer, govermentSelect } from "./connect";
import {
  clubmemberTotalBonus,
  clubmember_total_bonus_reducer
} from "./generalStatistics/total_bonus_select";
import {
  clubmemberCountSelect,
  clubmember_count_select_reducer
} from "./generalStatistics/clubmember_count_select";
import {
  clubmember_bourse_code_count_reducer,
  selectClubmemberBourseCode
} from "./generalStatistics/clubmember_bourse_code_select";
import {
  clubmember_daily_login_log_reducer,
  selectClubmemberLoginLog
} from "./generalStatistics/clubmember_daily_login_log_select";
import {
  clubmemberRegistrationCount,
  clubmember_registration_count_reducer
} from "./generalStatistics/clubmember_registration_count";
import {
  post_select_reducer,
  selectPost
} from "../redux/content/posts/post_select";
import {
  post_select_reject_reducer,
  selectPostReject
} from "../redux/content/posts/post_select_reject/index";
import {
  post_select_approve_reducer,
  selectPostApprove
} from "../redux/content/posts/post_select_approve/index";
import {
  post_select_subComment_reducer,
  selectPostSubComments
} from "../redux/content/posts/post_select_subComment";
import {
  forum_select_reducer,
  selectForum
} from "../redux/content/category/forum_select";
import {
  select_clubmember_brokerCustomer_reducer,
  selecClubmemberBrokerCustomer
} from "../redux/clubmember/clubmember_select_broker_cutomer";
import {
  select_clubmember_attachment_reducer,
  selecClubmemberAttachment
} from "../redux/clubmember/clubmember_select_broker_customer_atachement";
import {
  branches_select_reducer,
  branchesSelect
} from "./connect/branches_select";
import {
  brochures_static_select_reducer,
  brochure_static_select
} from "../redux/education/educationBrochures_static_select/index";

import {
  aboutUs_select_static_reducer,
  selectStaticAboutUs
} from "./content/aboutUs/select_static_about";
import { Creadit_select_reducer, creaditSelect } from "./profile/creadit";
import {
  requests_gift_select_Reducer,
  requestGiftSelectList
} from "./gift/requestGift_select";
import {
  GiftSelectActiveNameList,
  gift_select_active_name_Reducer
} from "./gift/gift_select_active_name";
import { request_gift_v1_select_bulk_registration_Reducer } from "./gift/requestGift_v1_finalize_bulk_registration/reducer";

import {
  discountSelect,
  discount_code_select_reducer
} from "./gift/discountCode/select_single_discount_code";
import {
  person_select_reducer,
  personSelect
} from "./gift/discountCode/person_select";
import {
  application_static_select_reducer,
  applicationStaticSelect
} from "./education/education_application/index";
import {
  slider_static_select_reducer,
  sliderStaticSelect
} from "./content/slider/slider_static_select/index";
import { ipoSelect, ipo_select_reducer } from "./ipoList/ipo_select_static";
import { ipoUser, ipo_status_reducer } from "./ipoList/ipo_user_select_status";

import {
  creaditSelectStatic,
  creadit_select_static_reducer
} from "./static/creadit/creadit_select";
import {
  select_telegram_reducer,
  telegramSelect
} from "./connect/telegram_Select";
import {
  contactUs_select_reducer,
  contactUsSelect
} from "./formManager/contactUS/contactUs_select/index";
import {
  contactUsIdSelect,
  contactUs_select_Id_reducer
} from "./formManager/contactUS/contactUs_select_id";
import {
  marketerSelect,
  marketer_select_reducer
} from "./formManager/marketer/marketer_select";
import {
  selectStockManegement,
  select_siteManagment_Reducer
} from "./stock/siteManagement";
import {
  account_select_Reducer,
  accountSelect
} from "./static/account/account_select";
import {
  giftCash_select_onlineCharge_reducer,
  giftCashSelectonlineCharge
} from "./gift/giftCash_select_onlineCharge/index";
import {
  workWithUs_select_reducer,
  workWithUsSelect
} from "./formManager/workWithUs/workWithUs_select/index";
import {
  workWithUsAttachmentSelect,
  workWithUs_AttachmentSelect_reducer
} from "./formManager/workWithUs/workWithUs_Attachment_select/index";
import {
  stage_select_reducer,
  stageSelect
} from "./staging/staging_select/index";
import {
  bonusComputing_select_reducer,
  selectBonusComputing
} from "./bonus/bonusComputing/bonusComputing_select/index";
import {
  stockCash_Select_codal_reducer,
  stockCashSelectCodal
} from "./stock/stockCash/stockCash_select_codal_participation/index";
import {
  signUpHelpSelectStatic,
  signUpHelp_select_static_reducer
} from "./static/signUpHelp/signUpHelp_select";
import {
  news_select_Reducer,
  NewsSelect
} from "./content/news/news_select/index";

import {
  stockCash_insert_Reducer,
  stockCashInsert
} from "./stock/stockCash/stockCash_insert/stockCash_insert";
import {
  automationLog_Select_Reducer,
  automationLogSelect
} from "./Orders/automationLog/index";
import {
  system_select_static_reducer,
  systemsSelectStatic
} from "./static/systems/systems_select";

import {
  jobOpportunity_select_static_reducer,
  jobOpportunitySelectStatic
} from "./static/jobOpportunity/jobOpportunity_select";

import {
  select_payments_reducer,
  selectPayments
} from "./payments/select_payments";

import {
  select_signals_reducer,
  selectSignals
} from "./signalHafez/signals/select_signals";
import {
  select_signalsDetailDocument_reducer,
  selectSignalsDetailDocument
} from "./signalHafez/signals/select_detail_document";
import {
  select_SubscriptionPlans_reducer,
  selectSubscriptionPlans
} from "./signalHafez/subscriptionPlans/select_subscriptionPlans";
import {
  select_memberSubscriptions_reducer,
  selectMemberSubscriptions
} from "./signalHafez/memberSubscriptions/select_memberSubscriptions";

import {
  authenticationSelect,
  Authentication_select_reducer
} from "../redux/authenticationLiveness/authentication_select/index";
import {
  stockDataManagement_select_reducer,
  stockDataManagementSelect
} from "../redux/stock/stockDataManagement/stockDataManagement_select/index";
import {
  slider_select_Reducer,
  sliderSelect
} from "./static/slider/slider_select";
import {
  select_lottery_reducer,
  selectLottery
} from "./lottery/select_lottery";
import {
  feedBack_Select_ChatBody,
  feedbackSelectChatBody
} from "./feedback/feedback_select_chat_body";
import {
  reducerFeedbackSelectList,
  watcherFeedbackSelectList
} from "./feedback/feedback_Select";
import {
  permision_select_role_reducer,
  permisionRoleSelect
} from "./permision/permision_select_role/index";
import {select_clubmember_permitted_role_reducer,selecClubmemberPermittedRole} from './clubmember/clubmemeber_select_permited_role';

export const appReducer = combineReducers({
  gift_select_Reducer_categories,
  gift_select_Reducer_subCategories,
  gift_select_Reducer,
  gift_select_cashAggregated_Reducer,
  gift_select_aggregated_Reducer,
  requests_gift_select_Reducer,
  gift_select_active_name_Reducer,
  request_gift_v1_select_bulk_registration_Reducer,
  auth: auth.reducer,
  reducer_notificationAlert,
  select_bonus_reducer,
  select_bonus_requests_reducer,
  select_bouns_aggregated_reducer,
  select_bonus_management_reducer,
  education_insert_Reducer_newCourse,

  compatition_select_reducer,
  compatition_select_in_range_reducer,
  compatition_select_participation_reducer,
  performance_select_by_id_reducer,
  competitions_profile_reducer,
  orders_v1_select,
  select_OerdersAggregated_reducer,
  select_OerdersDetailes_reducer,
  select_StepByStepDiscount_reducer,
  person_v1_profile_picture,

  select_notify_reducer,
  club_member_Reducer,
  select_clubmember_reducer,
  select_clubmember_profile_picture_reducer,
  select_clubmember_introducing_member_id_reducer,
  select_clubmember_with_profile_picture_reducer,

  select_summaries_Reducer,
  select_siteManagment_Reducer,
  select_portfolio_daily_reducer,
  select_stock_details_reducer,
  select_member_remain_reducer,

  ipoList_select_Registered_reducer,
  ipoList_select_reducer,

  education_course_select_Reducer,
  education_course_insert_Reducer,
  education_profile_select_Reducer,
  course_select_registration,
  educationalVideo_select_static_Reducer,
  // customers: customersSlice.reducer,
  // products: productsSlice.reducer,
  // remarks: remarksSlice.reducer,
  // specifications: specificationsSlice.reducer

  select_login_list_reducer,
  excel_select_reducer,
  reducer_get_kyc_profile,
  changeBroker_select_reducer,

  faq_select_reducer,
  faq_select_category_reducer,

  select_summaries_search_Reducer,
  goverment_select_reducer,
  branches_select_reducer,

  clubmember_total_bonus_reducer,
  clubmember_count_select_reducer,
  clubmember_bourse_code_count_reducer,
  clubmember_daily_login_log_reducer,
  clubmember_registration_count_reducer,
  post_select_reducer,
  post_select_reject_reducer,
  post_select_approve_reducer,
  post_select_subComment_reducer,
  forum_select_reducer,

  select_clubmember_brokerCustomer_reducer,
  select_clubmember_attachment_reducer,
  aboutUs_select_static_reducer,
  brochures_static_select_reducer,
  Creadit_select_reducer,
  discount_code_select_reducer,
  person_select_reducer,
  application_static_select_reducer,
  slider_static_select_reducer,
  ipo_select_reducer,
  ipo_status_reducer,
  creadit_select_static_reducer,
  select_telegram_reducer,
  account_select_Reducer,
  marketer_select_reducer,
  contactUs_select_reducer,
  contactUs_select_Id_reducer,
  giftCash_select_onlineCharge_reducer,
  workWithUs_select_reducer,
  workWithUs_AttachmentSelect_reducer,
  stage_select_reducer,
  bonusComputing_select_reducer,
  stockCash_Select_codal_reducer,
  signUpHelp_select_static_reducer,
  news_select_Reducer,
  select_payments_reducer,
  stockCash_insert_Reducer,
  automationLog_Select_Reducer,
  select_signals_reducer,
  select_signalsDetailDocument_reducer,
  select_SubscriptionPlans_reducer,
  select_memberSubscriptions_reducer,
  Authentication_select_reducer,
  stockDataManagement_select_reducer,
  slider_select_Reducer,
  jobOpportunity_select_static_reducer,
  system_select_static_reducer,
  select_lottery_reducer,
  feedBack_Select_ChatBody,
  reducerFeedbackSelectList,
  select_clubmember_permitted_role_reducer,
  permision_select_role_reducer
});

export function* rootSaga() {
  yield all([
    auth.saga(),
    giftSelectActiveCategorisList(),
    giftSelectActiveSubCategoryList(),
    giftSelectList(),
    giftSelectCashAggregated(),
    giftSelectAggregated(),
    requestGiftSelectList(),
    GiftSelectActiveNameList(),
    selectBonus(),
    selectBonusRequests(),
    selectBounsAggregated(),
    selectBonusManagement(),
    educationInsertNewCourse(),

    CompatitionSelectActive(),
    CompatitionSelectInRange(),
    CompatitionSelectParticipations(),
    performanceSelectById(),
    compatitionProfileSelect(),
    personProfilePicture(),
    ordersSelect(),
    selecOerdersAggregated(),
    selecOerdersDetailes(),
    selecStepByStepDiscount(),
    selectNotify(),
    clubmemberSelect(),
    selecClubmember(),
    selectStockManegement(),
    selecClubmemberProfilePicture(),
    selecClubmemberIntroducingMemberId(),
    selecClubmemberWithProfilePicture(),

    selectSummaries(),
    selectPortfolioDaily(),
    selectStockDetails(),
    selectMemberRemain(),

    ipoListSelectRegistered(),
    ipoListSelect(),

    education_course_select_worker(),
    education_course_insert_worker(),
    education_profile_select_worker(),
    education_select_registration(),

    educationalVideoStatic(),

    selectLoginList(),
    excelSelect(),
    workerclubmember_with_profile_picture_reducer(),
    selectFaq(),
    selectFaqCategory(),
    selectChangeBroker(),
    selectSummariesSearch(),
    govermentSelect(),
    clubmemberTotalBonus(),
    clubmemberCountSelect(),
    selectClubmemberBourseCode(),
    selectClubmemberLoginLog(),
    clubmemberRegistrationCount(),
    selectPost(),
    selectPostReject(),
    selectPostApprove(),
    selectPostSubComments(),
    selectForum(),
    selecClubmemberBrokerCustomer(),
    selecClubmemberAttachment(),
    branchesSelect(),
    selectStaticAboutUs(),
    brochure_static_select(),
    creaditSelect(),
    discountSelect(),
    personSelect(),
    applicationStaticSelect(),
    sliderStaticSelect(),
    ipoSelect(),
    ipoUser(),
    creaditSelectStatic(),
    telegramSelect(),
    accountSelect(),
    marketerSelect(),
    contactUsSelect(),
    contactUsIdSelect(),
    giftCashSelectonlineCharge(),
    workWithUsSelect(),
    workWithUsAttachmentSelect(),
    stageSelect(),
    selectBonusComputing(),
    stockCashSelectCodal(),
    signUpHelpSelectStatic(),
    NewsSelect(),
    selectPayments(),
    stockCashInsert(),
    automationLogSelect(),
    selectSignals(),
    selectSignalsDetailDocument(),
    selectSubscriptionPlans(),
    selectMemberSubscriptions(),
    authenticationSelect(),
    stockDataManagementSelect(),
    sliderSelect(),
    jobOpportunitySelectStatic(),
    systemsSelectStatic(),
    selectLottery(),
    feedbackSelectChatBody(),
    watcherFeedbackSelectList(),
    selecClubmemberPermittedRole(),
    permisionRoleSelect()
  ]);
}

export const rootReducer = (state, action) => {
  if (action.type === EMPTYALLREDUCERS) {
    state = undefined;
    localStorage.clear();
  }
  return appReducer(state, action);
};
