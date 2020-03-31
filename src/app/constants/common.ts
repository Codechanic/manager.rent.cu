export class AppCommonConstants {

  public static LIST_CONTAINING_CARD_PADDING: number = 50;

  public static ROLES = {
    ROLE_ADMIN: "ROLE_ADMIN",
    ROLE_USER: "ROLE_USER"
  };

  public static ALERT_MESSAGE_TYPES = {
    SUCCESS: "success",
    WARNING: "warning",
    DANGER: "danger"
  };

  public static ALERT_MESSAGES = {
    SUCCESS: {
      HOUSE_CREATED: "House created success succesfully",
      HOUSE_UPDATED: "House updated successfully",
      PASSWORD_CHANGED: "Password changed successfully",
      USER_CHANGED: "User updated successfully"
    },
    ERROR: {}
  };

  public static PROFILE_PILLS = {
    CHANGE_PASSWORD: "Change password",
    PERSONAL_DATA: "Personal data"
  };

  public static DEFAUlT_SEASON_IDS = ["7", "9"];
}
