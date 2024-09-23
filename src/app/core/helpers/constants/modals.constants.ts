export class DepartmentContent {
  public static ADD_DEPARTMENT = 'Add Department';
  public static EDIT_DEPARTMENT = 'Edit Department';
  public static ADD_TEAM_MEMBER = 'Add Team Member';
  public static DEPARTMENT_NAME = 'Department Name';
  public static MEMBER_NAME = 'Member Name';
  public static TEXT_TYPE = 'Text';
  public static SUBMIT = 'Submit';
  public static CLOSE = 'Close';
  public static CANCEL = 'Cancel';
  public static BACK = 'Back';
}

export class LeaveContent {
  public static ADD_LEAVE = 'Add Leave';
  public static EDIT_LEAVE = 'Edit Leave';
  public static LEAVE_TYPE = 'Leave Type';
  public static FROM_DATE = 'From';
  public static TO_DATE = 'To';
  public static NUMBER_OF_DAYS = 'Number of days';
  public static REMAINIG_LEAVES = 'Remaining Leaves';
  public static LEAVE_REASON = 'Leave Reason';
  public static FIELDS_NAME = [
    {
      name: 'Leave Type',
      type: 'text',
    },
    {
      name: 'From',
      type: 'text',
    },
    {
      name: 'To',
      type: 'text',
    },
    {
      name: 'Number of days',
      type: 'text',
    },
    {
      name: 'Remaining Leaves',
      type: 'text',
    },
    {
      name: 'Leave Reason',
      type: 'text',
    },
  ];
  public static TEXT_TYPE = 'Text';
  public static SUBMIT = 'Submit';
  public static CLOSE = 'Close';
  public static CANCEL = 'Cancel';
  public static BACK = 'Back';
}
