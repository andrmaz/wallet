/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  _count?: Maybe<AccountCount>;
  budgets: Array<Budget>;
  createdAt: Scalars['DateTime']['output'];
  expenses: Array<Expense>;
  goals: Array<Goal>;
  id: Scalars['Int']['output'];
  incomes: Array<Income>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};


export type AccountBudgetsArgs = {
  cursor?: InputMaybe<BudgetWhereUniqueInput>;
  distinct?: InputMaybe<Array<BudgetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BudgetOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BudgetWhereInput>;
};


export type AccountExpensesArgs = {
  cursor?: InputMaybe<ExpenseWhereUniqueInput>;
  distinct?: InputMaybe<Array<ExpenseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type AccountGoalsArgs = {
  cursor?: InputMaybe<GoalWhereUniqueInput>;
  distinct?: InputMaybe<Array<GoalScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GoalOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GoalWhereInput>;
};


export type AccountIncomesArgs = {
  cursor?: InputMaybe<IncomeWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncomeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};

export type AccountAvgAggregate = {
  __typename?: 'AccountAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type AccountAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountCount = {
  __typename?: 'AccountCount';
  budgets: Scalars['Int']['output'];
  expenses: Scalars['Int']['output'];
  goals: Scalars['Int']['output'];
  incomes: Scalars['Int']['output'];
};


export type AccountCountBudgetsArgs = {
  where?: InputMaybe<BudgetWhereInput>;
};


export type AccountCountExpensesArgs = {
  where?: InputMaybe<ExpenseWhereInput>;
};


export type AccountCountGoalsArgs = {
  where?: InputMaybe<GoalWhereInput>;
};


export type AccountCountIncomesArgs = {
  where?: InputMaybe<IncomeWhereInput>;
};

export type AccountCountAggregate = {
  __typename?: 'AccountCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type AccountCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountCreateInput = {
  budgets?: InputMaybe<BudgetCreateNestedManyWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutAccountInput>;
  goals?: InputMaybe<GoalCreateNestedManyWithoutAccountInput>;
  incomes?: InputMaybe<IncomeCreateNestedManyWithoutAccountInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AccountCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AccountCreateWithoutUserInput>>;
};

export type AccountCreateNestedOneWithoutBudgetsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutBudgetsInput>;
  create?: InputMaybe<AccountCreateWithoutBudgetsInput>;
};

export type AccountCreateNestedOneWithoutExpensesInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutExpensesInput>;
  create?: InputMaybe<AccountCreateWithoutExpensesInput>;
};

export type AccountCreateNestedOneWithoutGoalsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutGoalsInput>;
  create?: InputMaybe<AccountCreateWithoutGoalsInput>;
};

export type AccountCreateNestedOneWithoutIncomesInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutIncomesInput>;
  create?: InputMaybe<AccountCreateWithoutIncomesInput>;
};

export type AccountCreateOrConnectWithoutBudgetsInput = {
  create: AccountCreateWithoutBudgetsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutExpensesInput = {
  create: AccountCreateWithoutExpensesInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutGoalsInput = {
  create: AccountCreateWithoutGoalsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutIncomesInput = {
  create: AccountCreateWithoutIncomesInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutUserInput = {
  create: AccountCreateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateWithoutBudgetsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutAccountInput>;
  goals?: InputMaybe<GoalCreateNestedManyWithoutAccountInput>;
  incomes?: InputMaybe<IncomeCreateNestedManyWithoutAccountInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutExpensesInput = {
  budgets?: InputMaybe<BudgetCreateNestedManyWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  goals?: InputMaybe<GoalCreateNestedManyWithoutAccountInput>;
  incomes?: InputMaybe<IncomeCreateNestedManyWithoutAccountInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutGoalsInput = {
  budgets?: InputMaybe<BudgetCreateNestedManyWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutAccountInput>;
  incomes?: InputMaybe<IncomeCreateNestedManyWithoutAccountInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutIncomesInput = {
  budgets?: InputMaybe<BudgetCreateNestedManyWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutAccountInput>;
  goals?: InputMaybe<GoalCreateNestedManyWithoutAccountInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutUserInput = {
  budgets?: InputMaybe<BudgetCreateNestedManyWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutAccountInput>;
  goals?: InputMaybe<GoalCreateNestedManyWithoutAccountInput>;
  incomes?: InputMaybe<IncomeCreateNestedManyWithoutAccountInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountGroupBy = {
  __typename?: 'AccountGroupBy';
  _avg?: Maybe<AccountAvgAggregate>;
  _count?: Maybe<AccountCountAggregate>;
  _max?: Maybe<AccountMaxAggregate>;
  _min?: Maybe<AccountMinAggregate>;
  _sum?: Maybe<AccountSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type AccountListRelationFilter = {
  every?: InputMaybe<AccountWhereInput>;
  none?: InputMaybe<AccountWhereInput>;
  some?: InputMaybe<AccountWhereInput>;
};

export type AccountMaxAggregate = {
  __typename?: 'AccountMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AccountMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountMinAggregate = {
  __typename?: 'AccountMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AccountMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AccountOrderByWithAggregationInput = {
  _avg?: InputMaybe<AccountAvgOrderByAggregateInput>;
  _count?: InputMaybe<AccountCountOrderByAggregateInput>;
  _max?: InputMaybe<AccountMaxOrderByAggregateInput>;
  _min?: InputMaybe<AccountMinOrderByAggregateInput>;
  _sum?: InputMaybe<AccountSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountOrderByWithRelationInput = {
  budgets?: InputMaybe<BudgetOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  expenses?: InputMaybe<ExpenseOrderByRelationAggregateInput>;
  goals?: InputMaybe<GoalOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  incomes?: InputMaybe<IncomeOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountRelationFilter = {
  is?: InputMaybe<AccountWhereInput>;
  isNot?: InputMaybe<AccountWhereInput>;
};

export enum AccountScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type AccountScalarWhereInput = {
  AND?: InputMaybe<Array<AccountScalarWhereInput>>;
  NOT?: InputMaybe<Array<AccountScalarWhereInput>>;
  OR?: InputMaybe<Array<AccountScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type AccountScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AccountScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AccountScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AccountScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<IntWithAggregatesFilter>;
};

export type AccountSumAggregate = {
  __typename?: 'AccountSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AccountSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type AccountUpdateInput = {
  budgets?: InputMaybe<BudgetUpdateManyWithoutAccountNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expenses?: InputMaybe<ExpenseUpdateManyWithoutAccountNestedInput>;
  goals?: InputMaybe<GoalUpdateManyWithoutAccountNestedInput>;
  incomes?: InputMaybe<IncomeUpdateManyWithoutAccountNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAccountsNestedInput>;
};

export type AccountUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AccountUpdateManyWithWhereWithoutUserInput = {
  data: AccountUpdateManyMutationInput;
  where: AccountScalarWhereInput;
};

export type AccountUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AccountCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AccountCreateWithoutUserInput>>;
  delete?: InputMaybe<Array<AccountWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AccountScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  set?: InputMaybe<Array<AccountWhereUniqueInput>>;
  update?: InputMaybe<Array<AccountUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<AccountUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<AccountUpsertWithWhereUniqueWithoutUserInput>>;
};

export type AccountUpdateOneRequiredWithoutBudgetsNestedInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutBudgetsInput>;
  create?: InputMaybe<AccountCreateWithoutBudgetsInput>;
  update?: InputMaybe<AccountUpdateToOneWithWhereWithoutBudgetsInput>;
  upsert?: InputMaybe<AccountUpsertWithoutBudgetsInput>;
};

export type AccountUpdateOneRequiredWithoutExpensesNestedInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutExpensesInput>;
  create?: InputMaybe<AccountCreateWithoutExpensesInput>;
  update?: InputMaybe<AccountUpdateToOneWithWhereWithoutExpensesInput>;
  upsert?: InputMaybe<AccountUpsertWithoutExpensesInput>;
};

export type AccountUpdateOneRequiredWithoutGoalsNestedInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutGoalsInput>;
  create?: InputMaybe<AccountCreateWithoutGoalsInput>;
  update?: InputMaybe<AccountUpdateToOneWithWhereWithoutGoalsInput>;
  upsert?: InputMaybe<AccountUpsertWithoutGoalsInput>;
};

export type AccountUpdateOneRequiredWithoutIncomesNestedInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutIncomesInput>;
  create?: InputMaybe<AccountCreateWithoutIncomesInput>;
  update?: InputMaybe<AccountUpdateToOneWithWhereWithoutIncomesInput>;
  upsert?: InputMaybe<AccountUpsertWithoutIncomesInput>;
};

export type AccountUpdateToOneWithWhereWithoutBudgetsInput = {
  data: AccountUpdateWithoutBudgetsInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountUpdateToOneWithWhereWithoutExpensesInput = {
  data: AccountUpdateWithoutExpensesInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountUpdateToOneWithWhereWithoutGoalsInput = {
  data: AccountUpdateWithoutGoalsInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountUpdateToOneWithWhereWithoutIncomesInput = {
  data: AccountUpdateWithoutIncomesInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountUpdateWithWhereUniqueWithoutUserInput = {
  data: AccountUpdateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountUpdateWithoutBudgetsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expenses?: InputMaybe<ExpenseUpdateManyWithoutAccountNestedInput>;
  goals?: InputMaybe<GoalUpdateManyWithoutAccountNestedInput>;
  incomes?: InputMaybe<IncomeUpdateManyWithoutAccountNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAccountsNestedInput>;
};

export type AccountUpdateWithoutExpensesInput = {
  budgets?: InputMaybe<BudgetUpdateManyWithoutAccountNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  goals?: InputMaybe<GoalUpdateManyWithoutAccountNestedInput>;
  incomes?: InputMaybe<IncomeUpdateManyWithoutAccountNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAccountsNestedInput>;
};

export type AccountUpdateWithoutGoalsInput = {
  budgets?: InputMaybe<BudgetUpdateManyWithoutAccountNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expenses?: InputMaybe<ExpenseUpdateManyWithoutAccountNestedInput>;
  incomes?: InputMaybe<IncomeUpdateManyWithoutAccountNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAccountsNestedInput>;
};

export type AccountUpdateWithoutIncomesInput = {
  budgets?: InputMaybe<BudgetUpdateManyWithoutAccountNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expenses?: InputMaybe<ExpenseUpdateManyWithoutAccountNestedInput>;
  goals?: InputMaybe<GoalUpdateManyWithoutAccountNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutAccountsNestedInput>;
};

export type AccountUpdateWithoutUserInput = {
  budgets?: InputMaybe<BudgetUpdateManyWithoutAccountNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expenses?: InputMaybe<ExpenseUpdateManyWithoutAccountNestedInput>;
  goals?: InputMaybe<GoalUpdateManyWithoutAccountNestedInput>;
  incomes?: InputMaybe<IncomeUpdateManyWithoutAccountNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AccountUpsertWithWhereUniqueWithoutUserInput = {
  create: AccountCreateWithoutUserInput;
  update: AccountUpdateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountUpsertWithoutBudgetsInput = {
  create: AccountCreateWithoutBudgetsInput;
  update: AccountUpdateWithoutBudgetsInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountUpsertWithoutExpensesInput = {
  create: AccountCreateWithoutExpensesInput;
  update: AccountUpdateWithoutExpensesInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountUpsertWithoutGoalsInput = {
  create: AccountCreateWithoutGoalsInput;
  update: AccountUpdateWithoutGoalsInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountUpsertWithoutIncomesInput = {
  create: AccountCreateWithoutIncomesInput;
  update: AccountUpdateWithoutIncomesInput;
  where?: InputMaybe<AccountWhereInput>;
};

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  budgets?: InputMaybe<BudgetListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expenses?: InputMaybe<ExpenseListRelationFilter>;
  goals?: InputMaybe<GoalListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  incomes?: InputMaybe<IncomeListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type AccountWhereUniqueInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  budgets?: InputMaybe<BudgetListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expenses?: InputMaybe<ExpenseListRelationFilter>;
  goals?: InputMaybe<GoalListRelationFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  incomes?: InputMaybe<IncomeListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput';
  count: Scalars['Int']['output'];
};

export type AggregateAccount = {
  __typename?: 'AggregateAccount';
  _avg?: Maybe<AccountAvgAggregate>;
  _count?: Maybe<AccountCountAggregate>;
  _max?: Maybe<AccountMaxAggregate>;
  _min?: Maybe<AccountMinAggregate>;
  _sum?: Maybe<AccountSumAggregate>;
};

export type AggregateBudget = {
  __typename?: 'AggregateBudget';
  _avg?: Maybe<BudgetAvgAggregate>;
  _count?: Maybe<BudgetCountAggregate>;
  _max?: Maybe<BudgetMaxAggregate>;
  _min?: Maybe<BudgetMinAggregate>;
  _sum?: Maybe<BudgetSumAggregate>;
};

export type AggregateCategory = {
  __typename?: 'AggregateCategory';
  _avg?: Maybe<CategoryAvgAggregate>;
  _count?: Maybe<CategoryCountAggregate>;
  _max?: Maybe<CategoryMaxAggregate>;
  _min?: Maybe<CategoryMinAggregate>;
  _sum?: Maybe<CategorySumAggregate>;
};

export type AggregateExpense = {
  __typename?: 'AggregateExpense';
  _avg?: Maybe<ExpenseAvgAggregate>;
  _count?: Maybe<ExpenseCountAggregate>;
  _max?: Maybe<ExpenseMaxAggregate>;
  _min?: Maybe<ExpenseMinAggregate>;
  _sum?: Maybe<ExpenseSumAggregate>;
};

export type AggregateGoal = {
  __typename?: 'AggregateGoal';
  _avg?: Maybe<GoalAvgAggregate>;
  _count?: Maybe<GoalCountAggregate>;
  _max?: Maybe<GoalMaxAggregate>;
  _min?: Maybe<GoalMinAggregate>;
  _sum?: Maybe<GoalSumAggregate>;
};

export type AggregateIncome = {
  __typename?: 'AggregateIncome';
  _avg?: Maybe<IncomeAvgAggregate>;
  _count?: Maybe<IncomeCountAggregate>;
  _max?: Maybe<IncomeMaxAggregate>;
  _min?: Maybe<IncomeMinAggregate>;
  _sum?: Maybe<IncomeSumAggregate>;
};

export type AggregateSchedule = {
  __typename?: 'AggregateSchedule';
  _count?: Maybe<ScheduleCountAggregate>;
  _max?: Maybe<ScheduleMaxAggregate>;
  _min?: Maybe<ScheduleMinAggregate>;
};

export type AggregateSource = {
  __typename?: 'AggregateSource';
  _count?: Maybe<SourceCountAggregate>;
  _max?: Maybe<SourceMaxAggregate>;
  _min?: Maybe<SourceMinAggregate>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
};

export type Budget = {
  __typename?: 'Budget';
  account: Account;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  category: Category;
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BudgetAvgAggregate = {
  __typename?: 'BudgetAvgAggregate';
  accountId?: Maybe<Scalars['Float']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  categoryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type BudgetAvgOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type BudgetCountAggregate = {
  __typename?: 'BudgetCountAggregate';
  _all: Scalars['Int']['output'];
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type BudgetCountOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BudgetCreateInput = {
  account: AccountCreateNestedOneWithoutBudgetsInput;
  amount: Scalars['Int']['input'];
  category: CategoryCreateNestedOneWithoutBudgetsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BudgetCreateNestedManyWithoutAccountInput = {
  connect?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BudgetCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<BudgetCreateWithoutAccountInput>>;
};

export type BudgetCreateNestedManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BudgetCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<BudgetCreateWithoutCategoryInput>>;
};

export type BudgetCreateOrConnectWithoutAccountInput = {
  create: BudgetCreateWithoutAccountInput;
  where: BudgetWhereUniqueInput;
};

export type BudgetCreateOrConnectWithoutCategoryInput = {
  create: BudgetCreateWithoutCategoryInput;
  where: BudgetWhereUniqueInput;
};

export type BudgetCreateWithoutAccountInput = {
  amount: Scalars['Int']['input'];
  category: CategoryCreateNestedOneWithoutBudgetsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BudgetCreateWithoutCategoryInput = {
  account: AccountCreateNestedOneWithoutBudgetsInput;
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BudgetGroupBy = {
  __typename?: 'BudgetGroupBy';
  _avg?: Maybe<BudgetAvgAggregate>;
  _count?: Maybe<BudgetCountAggregate>;
  _max?: Maybe<BudgetMaxAggregate>;
  _min?: Maybe<BudgetMinAggregate>;
  _sum?: Maybe<BudgetSumAggregate>;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BudgetListRelationFilter = {
  every?: InputMaybe<BudgetWhereInput>;
  none?: InputMaybe<BudgetWhereInput>;
  some?: InputMaybe<BudgetWhereInput>;
};

export type BudgetMaxAggregate = {
  __typename?: 'BudgetMaxAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BudgetMaxOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BudgetMinAggregate = {
  __typename?: 'BudgetMinAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BudgetMinOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BudgetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type BudgetOrderByWithAggregationInput = {
  _avg?: InputMaybe<BudgetAvgOrderByAggregateInput>;
  _count?: InputMaybe<BudgetCountOrderByAggregateInput>;
  _max?: InputMaybe<BudgetMaxOrderByAggregateInput>;
  _min?: InputMaybe<BudgetMinOrderByAggregateInput>;
  _sum?: InputMaybe<BudgetSumOrderByAggregateInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BudgetOrderByWithRelationInput = {
  account?: InputMaybe<AccountOrderByWithRelationInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  category?: InputMaybe<CategoryOrderByWithRelationInput>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum BudgetScalarFieldEnum {
  AccountId = 'accountId',
  Amount = 'amount',
  CategoryId = 'categoryId',
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type BudgetScalarWhereInput = {
  AND?: InputMaybe<Array<BudgetScalarWhereInput>>;
  NOT?: InputMaybe<Array<BudgetScalarWhereInput>>;
  OR?: InputMaybe<Array<BudgetScalarWhereInput>>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  categoryId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BudgetScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<BudgetScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<BudgetScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<BudgetScalarWhereWithAggregatesInput>>;
  accountId?: InputMaybe<IntWithAggregatesFilter>;
  amount?: InputMaybe<IntWithAggregatesFilter>;
  categoryId?: InputMaybe<IntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type BudgetSumAggregate = {
  __typename?: 'BudgetSumAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type BudgetSumOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type BudgetUpdateInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutBudgetsNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutBudgetsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BudgetUpdateManyMutationInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BudgetUpdateManyWithWhereWithoutAccountInput = {
  data: BudgetUpdateManyMutationInput;
  where: BudgetScalarWhereInput;
};

export type BudgetUpdateManyWithWhereWithoutCategoryInput = {
  data: BudgetUpdateManyMutationInput;
  where: BudgetScalarWhereInput;
};

export type BudgetUpdateManyWithoutAccountNestedInput = {
  connect?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BudgetCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<BudgetCreateWithoutAccountInput>>;
  delete?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BudgetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  set?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  update?: InputMaybe<Array<BudgetUpdateWithWhereUniqueWithoutAccountInput>>;
  updateMany?: InputMaybe<Array<BudgetUpdateManyWithWhereWithoutAccountInput>>;
  upsert?: InputMaybe<Array<BudgetUpsertWithWhereUniqueWithoutAccountInput>>;
};

export type BudgetUpdateManyWithoutCategoryNestedInput = {
  connect?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BudgetCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<BudgetCreateWithoutCategoryInput>>;
  delete?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BudgetScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  set?: InputMaybe<Array<BudgetWhereUniqueInput>>;
  update?: InputMaybe<Array<BudgetUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: InputMaybe<Array<BudgetUpdateManyWithWhereWithoutCategoryInput>>;
  upsert?: InputMaybe<Array<BudgetUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type BudgetUpdateWithWhereUniqueWithoutAccountInput = {
  data: BudgetUpdateWithoutAccountInput;
  where: BudgetWhereUniqueInput;
};

export type BudgetUpdateWithWhereUniqueWithoutCategoryInput = {
  data: BudgetUpdateWithoutCategoryInput;
  where: BudgetWhereUniqueInput;
};

export type BudgetUpdateWithoutAccountInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutBudgetsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BudgetUpdateWithoutCategoryInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutBudgetsNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BudgetUpsertWithWhereUniqueWithoutAccountInput = {
  create: BudgetCreateWithoutAccountInput;
  update: BudgetUpdateWithoutAccountInput;
  where: BudgetWhereUniqueInput;
};

export type BudgetUpsertWithWhereUniqueWithoutCategoryInput = {
  create: BudgetCreateWithoutCategoryInput;
  update: BudgetUpdateWithoutCategoryInput;
  where: BudgetWhereUniqueInput;
};

export type BudgetWhereInput = {
  AND?: InputMaybe<Array<BudgetWhereInput>>;
  NOT?: InputMaybe<Array<BudgetWhereInput>>;
  OR?: InputMaybe<Array<BudgetWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BudgetWhereUniqueInput = {
  AND?: InputMaybe<Array<BudgetWhereInput>>;
  NOT?: InputMaybe<Array<BudgetWhereInput>>;
  OR?: InputMaybe<Array<BudgetWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Category = {
  __typename?: 'Category';
  _count?: Maybe<CategoryCount>;
  budgets: Array<Budget>;
  createdAt: Scalars['DateTime']['output'];
  expenses: Array<Expense>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CategoryBudgetsArgs = {
  cursor?: InputMaybe<BudgetWhereUniqueInput>;
  distinct?: InputMaybe<Array<BudgetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BudgetOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BudgetWhereInput>;
};


export type CategoryExpensesArgs = {
  cursor?: InputMaybe<ExpenseWhereUniqueInput>;
  distinct?: InputMaybe<Array<ExpenseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};

export type CategoryAvgAggregate = {
  __typename?: 'CategoryAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type CategoryAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  budgets: Scalars['Int']['output'];
  expenses: Scalars['Int']['output'];
};


export type CategoryCountBudgetsArgs = {
  where?: InputMaybe<BudgetWhereInput>;
};


export type CategoryCountExpensesArgs = {
  where?: InputMaybe<ExpenseWhereInput>;
};

export type CategoryCountAggregate = {
  __typename?: 'CategoryCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type CategoryCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CategoryCreateInput = {
  budgets?: InputMaybe<BudgetCreateNestedManyWithoutCategoryInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutCategoryInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryCreateNestedOneWithoutBudgetsInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutBudgetsInput>;
  create?: InputMaybe<CategoryCreateWithoutBudgetsInput>;
};

export type CategoryCreateNestedOneWithoutExpensesInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutExpensesInput>;
  create?: InputMaybe<CategoryCreateWithoutExpensesInput>;
};

export type CategoryCreateOrConnectWithoutBudgetsInput = {
  create: CategoryCreateWithoutBudgetsInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateOrConnectWithoutExpensesInput = {
  create: CategoryCreateWithoutExpensesInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateWithoutBudgetsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutCategoryInput>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryCreateWithoutExpensesInput = {
  budgets?: InputMaybe<BudgetCreateNestedManyWithoutCategoryInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryGroupBy = {
  __typename?: 'CategoryGroupBy';
  _avg?: Maybe<CategoryAvgAggregate>;
  _count?: Maybe<CategoryCountAggregate>;
  _max?: Maybe<CategoryMaxAggregate>;
  _min?: Maybe<CategoryMinAggregate>;
  _sum?: Maybe<CategorySumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryMaxAggregate = {
  __typename?: 'CategoryMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CategoryMinAggregate = {
  __typename?: 'CategoryMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CategoryOrderByWithAggregationInput = {
  _avg?: InputMaybe<CategoryAvgOrderByAggregateInput>;
  _count?: InputMaybe<CategoryCountOrderByAggregateInput>;
  _max?: InputMaybe<CategoryMaxOrderByAggregateInput>;
  _min?: InputMaybe<CategoryMinOrderByAggregateInput>;
  _sum?: InputMaybe<CategorySumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CategoryOrderByWithRelationInput = {
  budgets?: InputMaybe<BudgetOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  expenses?: InputMaybe<ExpenseOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CategoryRelationFilter = {
  is?: InputMaybe<CategoryWhereInput>;
  isNot?: InputMaybe<CategoryWhereInput>;
};

export enum CategoryScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type CategoryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type CategorySumAggregate = {
  __typename?: 'CategorySumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type CategorySumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CategoryUpdateInput = {
  budgets?: InputMaybe<BudgetUpdateManyWithoutCategoryNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expenses?: InputMaybe<ExpenseUpdateManyWithoutCategoryNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CategoryUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CategoryUpdateOneRequiredWithoutBudgetsNestedInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutBudgetsInput>;
  create?: InputMaybe<CategoryCreateWithoutBudgetsInput>;
  update?: InputMaybe<CategoryUpdateToOneWithWhereWithoutBudgetsInput>;
  upsert?: InputMaybe<CategoryUpsertWithoutBudgetsInput>;
};

export type CategoryUpdateOneRequiredWithoutExpensesNestedInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutExpensesInput>;
  create?: InputMaybe<CategoryCreateWithoutExpensesInput>;
  update?: InputMaybe<CategoryUpdateToOneWithWhereWithoutExpensesInput>;
  upsert?: InputMaybe<CategoryUpsertWithoutExpensesInput>;
};

export type CategoryUpdateToOneWithWhereWithoutBudgetsInput = {
  data: CategoryUpdateWithoutBudgetsInput;
  where?: InputMaybe<CategoryWhereInput>;
};

export type CategoryUpdateToOneWithWhereWithoutExpensesInput = {
  data: CategoryUpdateWithoutExpensesInput;
  where?: InputMaybe<CategoryWhereInput>;
};

export type CategoryUpdateWithoutBudgetsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expenses?: InputMaybe<ExpenseUpdateManyWithoutCategoryNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CategoryUpdateWithoutExpensesInput = {
  budgets?: InputMaybe<BudgetUpdateManyWithoutCategoryNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CategoryUpsertWithoutBudgetsInput = {
  create: CategoryCreateWithoutBudgetsInput;
  update: CategoryUpdateWithoutBudgetsInput;
  where?: InputMaybe<CategoryWhereInput>;
};

export type CategoryUpsertWithoutExpensesInput = {
  create: CategoryCreateWithoutExpensesInput;
  update: CategoryUpdateWithoutExpensesInput;
  where?: InputMaybe<CategoryWhereInput>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  budgets?: InputMaybe<BudgetListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expenses?: InputMaybe<ExpenseListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CategoryWhereUniqueInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  budgets?: InputMaybe<BudgetListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expenses?: InputMaybe<ExpenseListRelationFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Expense = {
  __typename?: 'Expense';
  account: Account;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  category: Category;
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  debitDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  schedule: Schedule;
  scheduleName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExpenseAvgAggregate = {
  __typename?: 'ExpenseAvgAggregate';
  accountId?: Maybe<Scalars['Float']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  categoryId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type ExpenseAvgOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type ExpenseCountAggregate = {
  __typename?: 'ExpenseCountAggregate';
  _all: Scalars['Int']['output'];
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  debitDate: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  scheduleName: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type ExpenseCountOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  debitDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ExpenseCreateInput = {
  account: AccountCreateNestedOneWithoutExpensesInput;
  amount: Scalars['Int']['input'];
  category: CategoryCreateNestedOneWithoutExpensesInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  debitDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  schedule: ScheduleCreateNestedOneWithoutExpensesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ExpenseCreateNestedManyWithoutAccountInput = {
  connect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpenseCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<ExpenseCreateWithoutAccountInput>>;
};

export type ExpenseCreateNestedManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpenseCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<ExpenseCreateWithoutCategoryInput>>;
};

export type ExpenseCreateNestedManyWithoutScheduleInput = {
  connect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpenseCreateOrConnectWithoutScheduleInput>>;
  create?: InputMaybe<Array<ExpenseCreateWithoutScheduleInput>>;
};

export type ExpenseCreateOrConnectWithoutAccountInput = {
  create: ExpenseCreateWithoutAccountInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseCreateOrConnectWithoutCategoryInput = {
  create: ExpenseCreateWithoutCategoryInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseCreateOrConnectWithoutScheduleInput = {
  create: ExpenseCreateWithoutScheduleInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseCreateWithoutAccountInput = {
  amount: Scalars['Int']['input'];
  category: CategoryCreateNestedOneWithoutExpensesInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  debitDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  schedule: ScheduleCreateNestedOneWithoutExpensesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ExpenseCreateWithoutCategoryInput = {
  account: AccountCreateNestedOneWithoutExpensesInput;
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  debitDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  schedule: ScheduleCreateNestedOneWithoutExpensesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ExpenseCreateWithoutScheduleInput = {
  account: AccountCreateNestedOneWithoutExpensesInput;
  amount: Scalars['Int']['input'];
  category: CategoryCreateNestedOneWithoutExpensesInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  debitDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ExpenseGroupBy = {
  __typename?: 'ExpenseGroupBy';
  _avg?: Maybe<ExpenseAvgAggregate>;
  _count?: Maybe<ExpenseCountAggregate>;
  _max?: Maybe<ExpenseMaxAggregate>;
  _min?: Maybe<ExpenseMinAggregate>;
  _sum?: Maybe<ExpenseSumAggregate>;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  debitDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  scheduleName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExpenseListRelationFilter = {
  every?: InputMaybe<ExpenseWhereInput>;
  none?: InputMaybe<ExpenseWhereInput>;
  some?: InputMaybe<ExpenseWhereInput>;
};

export type ExpenseMaxAggregate = {
  __typename?: 'ExpenseMaxAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  debitDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  scheduleName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExpenseMaxOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  debitDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ExpenseMinAggregate = {
  __typename?: 'ExpenseMinAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  debitDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  scheduleName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExpenseMinOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  debitDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ExpenseOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ExpenseOrderByWithAggregationInput = {
  _avg?: InputMaybe<ExpenseAvgOrderByAggregateInput>;
  _count?: InputMaybe<ExpenseCountOrderByAggregateInput>;
  _max?: InputMaybe<ExpenseMaxOrderByAggregateInput>;
  _min?: InputMaybe<ExpenseMinOrderByAggregateInput>;
  _sum?: InputMaybe<ExpenseSumOrderByAggregateInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  debitDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ExpenseOrderByWithRelationInput = {
  account?: InputMaybe<AccountOrderByWithRelationInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  category?: InputMaybe<CategoryOrderByWithRelationInput>;
  categoryId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  debitDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schedule?: InputMaybe<ScheduleOrderByWithRelationInput>;
  scheduleName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ExpenseScalarFieldEnum {
  AccountId = 'accountId',
  Amount = 'amount',
  CategoryId = 'categoryId',
  CreatedAt = 'createdAt',
  DebitDate = 'debitDate',
  Description = 'description',
  Id = 'id',
  ScheduleName = 'scheduleName',
  UpdatedAt = 'updatedAt'
}

export type ExpenseScalarWhereInput = {
  AND?: InputMaybe<Array<ExpenseScalarWhereInput>>;
  NOT?: InputMaybe<Array<ExpenseScalarWhereInput>>;
  OR?: InputMaybe<Array<ExpenseScalarWhereInput>>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  categoryId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  debitDate?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  scheduleName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ExpenseScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ExpenseScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ExpenseScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ExpenseScalarWhereWithAggregatesInput>>;
  accountId?: InputMaybe<IntWithAggregatesFilter>;
  amount?: InputMaybe<IntWithAggregatesFilter>;
  categoryId?: InputMaybe<IntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  debitDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  scheduleName?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ExpenseSumAggregate = {
  __typename?: 'ExpenseSumAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ExpenseSumOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  categoryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type ExpenseUpdateInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutExpensesNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutExpensesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  debitDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  schedule?: InputMaybe<ScheduleUpdateOneRequiredWithoutExpensesNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ExpenseUpdateManyMutationInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  debitDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ExpenseUpdateManyWithWhereWithoutAccountInput = {
  data: ExpenseUpdateManyMutationInput;
  where: ExpenseScalarWhereInput;
};

export type ExpenseUpdateManyWithWhereWithoutCategoryInput = {
  data: ExpenseUpdateManyMutationInput;
  where: ExpenseScalarWhereInput;
};

export type ExpenseUpdateManyWithWhereWithoutScheduleInput = {
  data: ExpenseUpdateManyMutationInput;
  where: ExpenseScalarWhereInput;
};

export type ExpenseUpdateManyWithoutAccountNestedInput = {
  connect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpenseCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<ExpenseCreateWithoutAccountInput>>;
  delete?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ExpenseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  set?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  update?: InputMaybe<Array<ExpenseUpdateWithWhereUniqueWithoutAccountInput>>;
  updateMany?: InputMaybe<Array<ExpenseUpdateManyWithWhereWithoutAccountInput>>;
  upsert?: InputMaybe<Array<ExpenseUpsertWithWhereUniqueWithoutAccountInput>>;
};

export type ExpenseUpdateManyWithoutCategoryNestedInput = {
  connect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpenseCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<ExpenseCreateWithoutCategoryInput>>;
  delete?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ExpenseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  set?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  update?: InputMaybe<Array<ExpenseUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: InputMaybe<Array<ExpenseUpdateManyWithWhereWithoutCategoryInput>>;
  upsert?: InputMaybe<Array<ExpenseUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type ExpenseUpdateManyWithoutScheduleNestedInput = {
  connect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpenseCreateOrConnectWithoutScheduleInput>>;
  create?: InputMaybe<Array<ExpenseCreateWithoutScheduleInput>>;
  delete?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ExpenseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  set?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  update?: InputMaybe<Array<ExpenseUpdateWithWhereUniqueWithoutScheduleInput>>;
  updateMany?: InputMaybe<Array<ExpenseUpdateManyWithWhereWithoutScheduleInput>>;
  upsert?: InputMaybe<Array<ExpenseUpsertWithWhereUniqueWithoutScheduleInput>>;
};

export type ExpenseUpdateWithWhereUniqueWithoutAccountInput = {
  data: ExpenseUpdateWithoutAccountInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseUpdateWithWhereUniqueWithoutCategoryInput = {
  data: ExpenseUpdateWithoutCategoryInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseUpdateWithWhereUniqueWithoutScheduleInput = {
  data: ExpenseUpdateWithoutScheduleInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseUpdateWithoutAccountInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutExpensesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  debitDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  schedule?: InputMaybe<ScheduleUpdateOneRequiredWithoutExpensesNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ExpenseUpdateWithoutCategoryInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutExpensesNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  debitDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  schedule?: InputMaybe<ScheduleUpdateOneRequiredWithoutExpensesNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ExpenseUpdateWithoutScheduleInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutExpensesNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  category?: InputMaybe<CategoryUpdateOneRequiredWithoutExpensesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  debitDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ExpenseUpsertWithWhereUniqueWithoutAccountInput = {
  create: ExpenseCreateWithoutAccountInput;
  update: ExpenseUpdateWithoutAccountInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseUpsertWithWhereUniqueWithoutCategoryInput = {
  create: ExpenseCreateWithoutCategoryInput;
  update: ExpenseUpdateWithoutCategoryInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseUpsertWithWhereUniqueWithoutScheduleInput = {
  create: ExpenseCreateWithoutScheduleInput;
  update: ExpenseUpdateWithoutScheduleInput;
  where: ExpenseWhereUniqueInput;
};

export type ExpenseWhereInput = {
  AND?: InputMaybe<Array<ExpenseWhereInput>>;
  NOT?: InputMaybe<Array<ExpenseWhereInput>>;
  OR?: InputMaybe<Array<ExpenseWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  debitDate?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  schedule?: InputMaybe<ScheduleRelationFilter>;
  scheduleName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ExpenseWhereUniqueInput = {
  AND?: InputMaybe<Array<ExpenseWhereInput>>;
  NOT?: InputMaybe<Array<ExpenseWhereInput>>;
  OR?: InputMaybe<Array<ExpenseWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  category?: InputMaybe<CategoryRelationFilter>;
  categoryId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  debitDate?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  schedule?: InputMaybe<ScheduleRelationFilter>;
  scheduleName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Goal = {
  __typename?: 'Goal';
  account: Account;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  targetDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GoalAvgAggregate = {
  __typename?: 'GoalAvgAggregate';
  accountId?: Maybe<Scalars['Float']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type GoalAvgOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type GoalCountAggregate = {
  __typename?: 'GoalCountAggregate';
  _all: Scalars['Int']['output'];
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  targetDate: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type GoalCountOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  targetDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GoalCreateInput = {
  account: AccountCreateNestedOneWithoutGoalsInput;
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  targetDate: Scalars['DateTime']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GoalCreateNestedManyWithoutAccountInput = {
  connect?: InputMaybe<Array<GoalWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GoalCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<GoalCreateWithoutAccountInput>>;
};

export type GoalCreateOrConnectWithoutAccountInput = {
  create: GoalCreateWithoutAccountInput;
  where: GoalWhereUniqueInput;
};

export type GoalCreateWithoutAccountInput = {
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  targetDate: Scalars['DateTime']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GoalGroupBy = {
  __typename?: 'GoalGroupBy';
  _avg?: Maybe<GoalAvgAggregate>;
  _count?: Maybe<GoalCountAggregate>;
  _max?: Maybe<GoalMaxAggregate>;
  _min?: Maybe<GoalMinAggregate>;
  _sum?: Maybe<GoalSumAggregate>;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  targetDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GoalListRelationFilter = {
  every?: InputMaybe<GoalWhereInput>;
  none?: InputMaybe<GoalWhereInput>;
  some?: InputMaybe<GoalWhereInput>;
};

export type GoalMaxAggregate = {
  __typename?: 'GoalMaxAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  targetDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GoalMaxOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  targetDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GoalMinAggregate = {
  __typename?: 'GoalMinAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  targetDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GoalMinOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  targetDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GoalOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GoalOrderByWithAggregationInput = {
  _avg?: InputMaybe<GoalAvgOrderByAggregateInput>;
  _count?: InputMaybe<GoalCountOrderByAggregateInput>;
  _max?: InputMaybe<GoalMaxOrderByAggregateInput>;
  _min?: InputMaybe<GoalMinOrderByAggregateInput>;
  _sum?: InputMaybe<GoalSumOrderByAggregateInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  targetDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GoalOrderByWithRelationInput = {
  account?: InputMaybe<AccountOrderByWithRelationInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  targetDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum GoalScalarFieldEnum {
  AccountId = 'accountId',
  Amount = 'amount',
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  TargetDate = 'targetDate',
  UpdatedAt = 'updatedAt'
}

export type GoalScalarWhereInput = {
  AND?: InputMaybe<Array<GoalScalarWhereInput>>;
  NOT?: InputMaybe<Array<GoalScalarWhereInput>>;
  OR?: InputMaybe<Array<GoalScalarWhereInput>>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  targetDate?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GoalScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GoalScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GoalScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GoalScalarWhereWithAggregatesInput>>;
  accountId?: InputMaybe<IntWithAggregatesFilter>;
  amount?: InputMaybe<IntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  targetDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GoalSumAggregate = {
  __typename?: 'GoalSumAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type GoalSumOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type GoalUpdateInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutGoalsNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  targetDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GoalUpdateManyMutationInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  targetDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GoalUpdateManyWithWhereWithoutAccountInput = {
  data: GoalUpdateManyMutationInput;
  where: GoalScalarWhereInput;
};

export type GoalUpdateManyWithoutAccountNestedInput = {
  connect?: InputMaybe<Array<GoalWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GoalCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<GoalCreateWithoutAccountInput>>;
  delete?: InputMaybe<Array<GoalWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GoalScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GoalWhereUniqueInput>>;
  set?: InputMaybe<Array<GoalWhereUniqueInput>>;
  update?: InputMaybe<Array<GoalUpdateWithWhereUniqueWithoutAccountInput>>;
  updateMany?: InputMaybe<Array<GoalUpdateManyWithWhereWithoutAccountInput>>;
  upsert?: InputMaybe<Array<GoalUpsertWithWhereUniqueWithoutAccountInput>>;
};

export type GoalUpdateWithWhereUniqueWithoutAccountInput = {
  data: GoalUpdateWithoutAccountInput;
  where: GoalWhereUniqueInput;
};

export type GoalUpdateWithoutAccountInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  targetDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GoalUpsertWithWhereUniqueWithoutAccountInput = {
  create: GoalCreateWithoutAccountInput;
  update: GoalUpdateWithoutAccountInput;
  where: GoalWhereUniqueInput;
};

export type GoalWhereInput = {
  AND?: InputMaybe<Array<GoalWhereInput>>;
  NOT?: InputMaybe<Array<GoalWhereInput>>;
  OR?: InputMaybe<Array<GoalWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  targetDate?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GoalWhereUniqueInput = {
  AND?: InputMaybe<Array<GoalWhereInput>>;
  NOT?: InputMaybe<Array<GoalWhereInput>>;
  OR?: InputMaybe<Array<GoalWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  targetDate?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Income = {
  __typename?: 'Income';
  account: Account;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  creditDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  schedule: Schedule;
  scheduleName: Scalars['String']['output'];
  source: Source;
  sourceName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IncomeAvgAggregate = {
  __typename?: 'IncomeAvgAggregate';
  accountId?: Maybe<Scalars['Float']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type IncomeAvgOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type IncomeCountAggregate = {
  __typename?: 'IncomeCountAggregate';
  _all: Scalars['Int']['output'];
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  creditDate: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  scheduleName: Scalars['Int']['output'];
  sourceName: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type IncomeCountOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creditDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  sourceName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type IncomeCreateInput = {
  account: AccountCreateNestedOneWithoutIncomesInput;
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creditDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  schedule: ScheduleCreateNestedOneWithoutIncomesInput;
  source: SourceCreateNestedOneWithoutIncomeInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IncomeCreateNestedManyWithoutAccountInput = {
  connect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncomeCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<IncomeCreateWithoutAccountInput>>;
};

export type IncomeCreateNestedManyWithoutScheduleInput = {
  connect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncomeCreateOrConnectWithoutScheduleInput>>;
  create?: InputMaybe<Array<IncomeCreateWithoutScheduleInput>>;
};

export type IncomeCreateNestedManyWithoutSourceInput = {
  connect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncomeCreateOrConnectWithoutSourceInput>>;
  create?: InputMaybe<Array<IncomeCreateWithoutSourceInput>>;
};

export type IncomeCreateOrConnectWithoutAccountInput = {
  create: IncomeCreateWithoutAccountInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeCreateOrConnectWithoutScheduleInput = {
  create: IncomeCreateWithoutScheduleInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeCreateOrConnectWithoutSourceInput = {
  create: IncomeCreateWithoutSourceInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeCreateWithoutAccountInput = {
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creditDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  schedule: ScheduleCreateNestedOneWithoutIncomesInput;
  source: SourceCreateNestedOneWithoutIncomeInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IncomeCreateWithoutScheduleInput = {
  account: AccountCreateNestedOneWithoutIncomesInput;
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creditDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  source: SourceCreateNestedOneWithoutIncomeInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IncomeCreateWithoutSourceInput = {
  account: AccountCreateNestedOneWithoutIncomesInput;
  amount: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  creditDate: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  schedule: ScheduleCreateNestedOneWithoutIncomesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IncomeGroupBy = {
  __typename?: 'IncomeGroupBy';
  _avg?: Maybe<IncomeAvgAggregate>;
  _count?: Maybe<IncomeCountAggregate>;
  _max?: Maybe<IncomeMaxAggregate>;
  _min?: Maybe<IncomeMinAggregate>;
  _sum?: Maybe<IncomeSumAggregate>;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  creditDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  scheduleName: Scalars['String']['output'];
  sourceName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IncomeListRelationFilter = {
  every?: InputMaybe<IncomeWhereInput>;
  none?: InputMaybe<IncomeWhereInput>;
  some?: InputMaybe<IncomeWhereInput>;
};

export type IncomeMaxAggregate = {
  __typename?: 'IncomeMaxAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  scheduleName?: Maybe<Scalars['String']['output']>;
  sourceName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IncomeMaxOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creditDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  sourceName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type IncomeMinAggregate = {
  __typename?: 'IncomeMinAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  scheduleName?: Maybe<Scalars['String']['output']>;
  sourceName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IncomeMinOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creditDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  sourceName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type IncomeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type IncomeOrderByWithAggregationInput = {
  _avg?: InputMaybe<IncomeAvgOrderByAggregateInput>;
  _count?: InputMaybe<IncomeCountOrderByAggregateInput>;
  _max?: InputMaybe<IncomeMaxOrderByAggregateInput>;
  _min?: InputMaybe<IncomeMinOrderByAggregateInput>;
  _sum?: InputMaybe<IncomeSumOrderByAggregateInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creditDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheduleName?: InputMaybe<SortOrder>;
  sourceName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type IncomeOrderByWithRelationInput = {
  account?: InputMaybe<AccountOrderByWithRelationInput>;
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creditDate?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schedule?: InputMaybe<ScheduleOrderByWithRelationInput>;
  scheduleName?: InputMaybe<SortOrder>;
  source?: InputMaybe<SourceOrderByWithRelationInput>;
  sourceName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum IncomeScalarFieldEnum {
  AccountId = 'accountId',
  Amount = 'amount',
  CreatedAt = 'createdAt',
  CreditDate = 'creditDate',
  Description = 'description',
  Id = 'id',
  ScheduleName = 'scheduleName',
  SourceName = 'sourceName',
  UpdatedAt = 'updatedAt'
}

export type IncomeScalarWhereInput = {
  AND?: InputMaybe<Array<IncomeScalarWhereInput>>;
  NOT?: InputMaybe<Array<IncomeScalarWhereInput>>;
  OR?: InputMaybe<Array<IncomeScalarWhereInput>>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creditDate?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  scheduleName?: InputMaybe<StringFilter>;
  sourceName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IncomeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<IncomeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<IncomeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<IncomeScalarWhereWithAggregatesInput>>;
  accountId?: InputMaybe<IntWithAggregatesFilter>;
  amount?: InputMaybe<IntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  creditDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  scheduleName?: InputMaybe<StringWithAggregatesFilter>;
  sourceName?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type IncomeSumAggregate = {
  __typename?: 'IncomeSumAggregate';
  accountId?: Maybe<Scalars['Int']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type IncomeSumOrderByAggregateInput = {
  accountId?: InputMaybe<SortOrder>;
  amount?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type IncomeUpdateInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutIncomesNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creditDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  schedule?: InputMaybe<ScheduleUpdateOneRequiredWithoutIncomesNestedInput>;
  source?: InputMaybe<SourceUpdateOneRequiredWithoutIncomeNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IncomeUpdateManyMutationInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creditDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IncomeUpdateManyWithWhereWithoutAccountInput = {
  data: IncomeUpdateManyMutationInput;
  where: IncomeScalarWhereInput;
};

export type IncomeUpdateManyWithWhereWithoutScheduleInput = {
  data: IncomeUpdateManyMutationInput;
  where: IncomeScalarWhereInput;
};

export type IncomeUpdateManyWithWhereWithoutSourceInput = {
  data: IncomeUpdateManyMutationInput;
  where: IncomeScalarWhereInput;
};

export type IncomeUpdateManyWithoutAccountNestedInput = {
  connect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncomeCreateOrConnectWithoutAccountInput>>;
  create?: InputMaybe<Array<IncomeCreateWithoutAccountInput>>;
  delete?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncomeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  set?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  update?: InputMaybe<Array<IncomeUpdateWithWhereUniqueWithoutAccountInput>>;
  updateMany?: InputMaybe<Array<IncomeUpdateManyWithWhereWithoutAccountInput>>;
  upsert?: InputMaybe<Array<IncomeUpsertWithWhereUniqueWithoutAccountInput>>;
};

export type IncomeUpdateManyWithoutScheduleNestedInput = {
  connect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncomeCreateOrConnectWithoutScheduleInput>>;
  create?: InputMaybe<Array<IncomeCreateWithoutScheduleInput>>;
  delete?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncomeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  set?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  update?: InputMaybe<Array<IncomeUpdateWithWhereUniqueWithoutScheduleInput>>;
  updateMany?: InputMaybe<Array<IncomeUpdateManyWithWhereWithoutScheduleInput>>;
  upsert?: InputMaybe<Array<IncomeUpsertWithWhereUniqueWithoutScheduleInput>>;
};

export type IncomeUpdateManyWithoutSourceNestedInput = {
  connect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncomeCreateOrConnectWithoutSourceInput>>;
  create?: InputMaybe<Array<IncomeCreateWithoutSourceInput>>;
  delete?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncomeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  set?: InputMaybe<Array<IncomeWhereUniqueInput>>;
  update?: InputMaybe<Array<IncomeUpdateWithWhereUniqueWithoutSourceInput>>;
  updateMany?: InputMaybe<Array<IncomeUpdateManyWithWhereWithoutSourceInput>>;
  upsert?: InputMaybe<Array<IncomeUpsertWithWhereUniqueWithoutSourceInput>>;
};

export type IncomeUpdateWithWhereUniqueWithoutAccountInput = {
  data: IncomeUpdateWithoutAccountInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeUpdateWithWhereUniqueWithoutScheduleInput = {
  data: IncomeUpdateWithoutScheduleInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeUpdateWithWhereUniqueWithoutSourceInput = {
  data: IncomeUpdateWithoutSourceInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeUpdateWithoutAccountInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creditDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  schedule?: InputMaybe<ScheduleUpdateOneRequiredWithoutIncomesNestedInput>;
  source?: InputMaybe<SourceUpdateOneRequiredWithoutIncomeNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IncomeUpdateWithoutScheduleInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutIncomesNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creditDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  source?: InputMaybe<SourceUpdateOneRequiredWithoutIncomeNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IncomeUpdateWithoutSourceInput = {
  account?: InputMaybe<AccountUpdateOneRequiredWithoutIncomesNestedInput>;
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creditDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  schedule?: InputMaybe<ScheduleUpdateOneRequiredWithoutIncomesNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IncomeUpsertWithWhereUniqueWithoutAccountInput = {
  create: IncomeCreateWithoutAccountInput;
  update: IncomeUpdateWithoutAccountInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeUpsertWithWhereUniqueWithoutScheduleInput = {
  create: IncomeCreateWithoutScheduleInput;
  update: IncomeUpdateWithoutScheduleInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeUpsertWithWhereUniqueWithoutSourceInput = {
  create: IncomeCreateWithoutSourceInput;
  update: IncomeUpdateWithoutSourceInput;
  where: IncomeWhereUniqueInput;
};

export type IncomeWhereInput = {
  AND?: InputMaybe<Array<IncomeWhereInput>>;
  NOT?: InputMaybe<Array<IncomeWhereInput>>;
  OR?: InputMaybe<Array<IncomeWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creditDate?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  schedule?: InputMaybe<ScheduleRelationFilter>;
  scheduleName?: InputMaybe<StringFilter>;
  source?: InputMaybe<SourceRelationFilter>;
  sourceName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IncomeWhereUniqueInput = {
  AND?: InputMaybe<Array<IncomeWhereInput>>;
  NOT?: InputMaybe<Array<IncomeWhereInput>>;
  OR?: InputMaybe<Array<IncomeWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<IntFilter>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creditDate?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  schedule?: InputMaybe<ScheduleRelationFilter>;
  scheduleName?: InputMaybe<StringFilter>;
  source?: InputMaybe<SourceRelationFilter>;
  sourceName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneAccount: Account;
  createOneBudget: Budget;
  createOneCategory: Category;
  createOneExpense: Expense;
  createOneGoal: Goal;
  createOneIncome: Income;
  createOneSchedule: Schedule;
  createOneSource: Source;
  createOneUser: User;
  deleteManyAccount: AffectedRowsOutput;
  deleteManyBudget: AffectedRowsOutput;
  deleteManyCategory: AffectedRowsOutput;
  deleteManyExpense: AffectedRowsOutput;
  deleteManyGoal: AffectedRowsOutput;
  deleteManyIncome: AffectedRowsOutput;
  deleteManySchedule: AffectedRowsOutput;
  deleteManySource: AffectedRowsOutput;
  deleteManyUser: AffectedRowsOutput;
  deleteOneAccount?: Maybe<Account>;
  deleteOneBudget?: Maybe<Budget>;
  deleteOneCategory?: Maybe<Category>;
  deleteOneExpense?: Maybe<Expense>;
  deleteOneGoal?: Maybe<Goal>;
  deleteOneIncome?: Maybe<Income>;
  deleteOneSchedule?: Maybe<Schedule>;
  deleteOneSource?: Maybe<Source>;
  deleteOneUser?: Maybe<User>;
  updateManyAccount: AffectedRowsOutput;
  updateManyBudget: AffectedRowsOutput;
  updateManyCategory: AffectedRowsOutput;
  updateManyExpense: AffectedRowsOutput;
  updateManyGoal: AffectedRowsOutput;
  updateManyIncome: AffectedRowsOutput;
  updateManySchedule: AffectedRowsOutput;
  updateManySource: AffectedRowsOutput;
  updateManyUser: AffectedRowsOutput;
  updateOneAccount?: Maybe<Account>;
  updateOneBudget?: Maybe<Budget>;
  updateOneCategory?: Maybe<Category>;
  updateOneExpense?: Maybe<Expense>;
  updateOneGoal?: Maybe<Goal>;
  updateOneIncome?: Maybe<Income>;
  updateOneSchedule?: Maybe<Schedule>;
  updateOneSource?: Maybe<Source>;
  updateOneUser?: Maybe<User>;
  upsertOneAccount: Account;
  upsertOneBudget: Budget;
  upsertOneCategory: Category;
  upsertOneExpense: Expense;
  upsertOneGoal: Goal;
  upsertOneIncome: Income;
  upsertOneSchedule: Schedule;
  upsertOneSource: Source;
  upsertOneUser: User;
};


export type MutationCreateOneAccountArgs = {
  data: AccountCreateInput;
};


export type MutationCreateOneBudgetArgs = {
  data: BudgetCreateInput;
};


export type MutationCreateOneCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateOneExpenseArgs = {
  data: ExpenseCreateInput;
};


export type MutationCreateOneGoalArgs = {
  data: GoalCreateInput;
};


export type MutationCreateOneIncomeArgs = {
  data: IncomeCreateInput;
};


export type MutationCreateOneScheduleArgs = {
  data: ScheduleCreateInput;
};


export type MutationCreateOneSourceArgs = {
  data: SourceCreateInput;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteManyAccountArgs = {
  where?: InputMaybe<AccountWhereInput>;
};


export type MutationDeleteManyBudgetArgs = {
  where?: InputMaybe<BudgetWhereInput>;
};


export type MutationDeleteManyCategoryArgs = {
  where?: InputMaybe<CategoryWhereInput>;
};


export type MutationDeleteManyExpenseArgs = {
  where?: InputMaybe<ExpenseWhereInput>;
};


export type MutationDeleteManyGoalArgs = {
  where?: InputMaybe<GoalWhereInput>;
};


export type MutationDeleteManyIncomeArgs = {
  where?: InputMaybe<IncomeWhereInput>;
};


export type MutationDeleteManyScheduleArgs = {
  where?: InputMaybe<ScheduleWhereInput>;
};


export type MutationDeleteManySourceArgs = {
  where?: InputMaybe<SourceWhereInput>;
};


export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
};


export type MutationDeleteOneAccountArgs = {
  where: AccountWhereUniqueInput;
};


export type MutationDeleteOneBudgetArgs = {
  where: BudgetWhereUniqueInput;
};


export type MutationDeleteOneCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteOneExpenseArgs = {
  where: ExpenseWhereUniqueInput;
};


export type MutationDeleteOneGoalArgs = {
  where: GoalWhereUniqueInput;
};


export type MutationDeleteOneIncomeArgs = {
  where: IncomeWhereUniqueInput;
};


export type MutationDeleteOneScheduleArgs = {
  where: ScheduleWhereUniqueInput;
};


export type MutationDeleteOneSourceArgs = {
  where: SourceWhereUniqueInput;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationUpdateManyAccountArgs = {
  data: AccountUpdateManyMutationInput;
  where?: InputMaybe<AccountWhereInput>;
};


export type MutationUpdateManyBudgetArgs = {
  data: BudgetUpdateManyMutationInput;
  where?: InputMaybe<BudgetWhereInput>;
};


export type MutationUpdateManyCategoryArgs = {
  data: CategoryUpdateManyMutationInput;
  where?: InputMaybe<CategoryWhereInput>;
};


export type MutationUpdateManyExpenseArgs = {
  data: ExpenseUpdateManyMutationInput;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type MutationUpdateManyGoalArgs = {
  data: GoalUpdateManyMutationInput;
  where?: InputMaybe<GoalWhereInput>;
};


export type MutationUpdateManyIncomeArgs = {
  data: IncomeUpdateManyMutationInput;
  where?: InputMaybe<IncomeWhereInput>;
};


export type MutationUpdateManyScheduleArgs = {
  data: ScheduleUpdateManyMutationInput;
  where?: InputMaybe<ScheduleWhereInput>;
};


export type MutationUpdateManySourceArgs = {
  data: SourceUpdateManyMutationInput;
  where?: InputMaybe<SourceWhereInput>;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};


export type MutationUpdateOneAccountArgs = {
  data: AccountUpdateInput;
  where: AccountWhereUniqueInput;
};


export type MutationUpdateOneBudgetArgs = {
  data: BudgetUpdateInput;
  where: BudgetWhereUniqueInput;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateOneExpenseArgs = {
  data: ExpenseUpdateInput;
  where: ExpenseWhereUniqueInput;
};


export type MutationUpdateOneGoalArgs = {
  data: GoalUpdateInput;
  where: GoalWhereUniqueInput;
};


export type MutationUpdateOneIncomeArgs = {
  data: IncomeUpdateInput;
  where: IncomeWhereUniqueInput;
};


export type MutationUpdateOneScheduleArgs = {
  data: ScheduleUpdateInput;
  where: ScheduleWhereUniqueInput;
};


export type MutationUpdateOneSourceArgs = {
  data: SourceUpdateInput;
  where: SourceWhereUniqueInput;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpsertOneAccountArgs = {
  create: AccountCreateInput;
  update: AccountUpdateInput;
  where: AccountWhereUniqueInput;
};


export type MutationUpsertOneBudgetArgs = {
  create: BudgetCreateInput;
  update: BudgetUpdateInput;
  where: BudgetWhereUniqueInput;
};


export type MutationUpsertOneCategoryArgs = {
  create: CategoryCreateInput;
  update: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpsertOneExpenseArgs = {
  create: ExpenseCreateInput;
  update: ExpenseUpdateInput;
  where: ExpenseWhereUniqueInput;
};


export type MutationUpsertOneGoalArgs = {
  create: GoalCreateInput;
  update: GoalUpdateInput;
  where: GoalWhereUniqueInput;
};


export type MutationUpsertOneIncomeArgs = {
  create: IncomeCreateInput;
  update: IncomeUpdateInput;
  where: IncomeWhereUniqueInput;
};


export type MutationUpsertOneScheduleArgs = {
  create: ScheduleCreateInput;
  update: ScheduleUpdateInput;
  where: ScheduleWhereUniqueInput;
};


export type MutationUpsertOneSourceArgs = {
  create: SourceCreateInput;
  update: SourceUpdateInput;
  where: SourceWhereUniqueInput;
};


export type MutationUpsertOneUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  aggregateAccount: AggregateAccount;
  aggregateBudget: AggregateBudget;
  aggregateCategory: AggregateCategory;
  aggregateExpense: AggregateExpense;
  aggregateGoal: AggregateGoal;
  aggregateIncome: AggregateIncome;
  aggregateSchedule: AggregateSchedule;
  aggregateSource: AggregateSource;
  aggregateUser: AggregateUser;
  budget?: Maybe<Budget>;
  budgets: Array<Budget>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  expense?: Maybe<Expense>;
  expenses: Array<Expense>;
  findFirstAccount?: Maybe<Account>;
  findFirstAccountOrThrow?: Maybe<Account>;
  findFirstBudget?: Maybe<Budget>;
  findFirstBudgetOrThrow?: Maybe<Budget>;
  findFirstCategory?: Maybe<Category>;
  findFirstCategoryOrThrow?: Maybe<Category>;
  findFirstExpense?: Maybe<Expense>;
  findFirstExpenseOrThrow?: Maybe<Expense>;
  findFirstGoal?: Maybe<Goal>;
  findFirstGoalOrThrow?: Maybe<Goal>;
  findFirstIncome?: Maybe<Income>;
  findFirstIncomeOrThrow?: Maybe<Income>;
  findFirstSchedule?: Maybe<Schedule>;
  findFirstScheduleOrThrow?: Maybe<Schedule>;
  findFirstSource?: Maybe<Source>;
  findFirstSourceOrThrow?: Maybe<Source>;
  findFirstUser?: Maybe<User>;
  findFirstUserOrThrow?: Maybe<User>;
  getAccount?: Maybe<Account>;
  getBudget?: Maybe<Budget>;
  getCategory?: Maybe<Category>;
  getExpense?: Maybe<Expense>;
  getGoal?: Maybe<Goal>;
  getIncome?: Maybe<Income>;
  getSchedule?: Maybe<Schedule>;
  getSource?: Maybe<Source>;
  getUser?: Maybe<User>;
  goal?: Maybe<Goal>;
  goals: Array<Goal>;
  groupByAccount: Array<AccountGroupBy>;
  groupByBudget: Array<BudgetGroupBy>;
  groupByCategory: Array<CategoryGroupBy>;
  groupByExpense: Array<ExpenseGroupBy>;
  groupByGoal: Array<GoalGroupBy>;
  groupByIncome: Array<IncomeGroupBy>;
  groupBySchedule: Array<ScheduleGroupBy>;
  groupBySource: Array<SourceGroupBy>;
  groupByUser: Array<UserGroupBy>;
  income?: Maybe<Income>;
  incomes: Array<Income>;
  schedule?: Maybe<Schedule>;
  schedules: Array<Schedule>;
  source?: Maybe<Source>;
  sources: Array<Source>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAccountArgs = {
  where: AccountWhereUniqueInput;
};


export type QueryAccountsArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryAggregateAccountArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryAggregateBudgetArgs = {
  cursor?: InputMaybe<BudgetWhereUniqueInput>;
  orderBy?: InputMaybe<Array<BudgetOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BudgetWhereInput>;
};


export type QueryAggregateCategoryArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryAggregateExpenseArgs = {
  cursor?: InputMaybe<ExpenseWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type QueryAggregateGoalArgs = {
  cursor?: InputMaybe<GoalWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GoalOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GoalWhereInput>;
};


export type QueryAggregateIncomeArgs = {
  cursor?: InputMaybe<IncomeWhereUniqueInput>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};


export type QueryAggregateScheduleArgs = {
  cursor?: InputMaybe<ScheduleWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ScheduleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduleWhereInput>;
};


export type QueryAggregateSourceArgs = {
  cursor?: InputMaybe<SourceWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SourceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SourceWhereInput>;
};


export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryBudgetArgs = {
  where: BudgetWhereUniqueInput;
};


export type QueryBudgetsArgs = {
  cursor?: InputMaybe<BudgetWhereUniqueInput>;
  distinct?: InputMaybe<Array<BudgetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BudgetOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BudgetWhereInput>;
};


export type QueryCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryExpenseArgs = {
  where: ExpenseWhereUniqueInput;
};


export type QueryExpensesArgs = {
  cursor?: InputMaybe<ExpenseWhereUniqueInput>;
  distinct?: InputMaybe<Array<ExpenseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type QueryFindFirstAccountArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryFindFirstAccountOrThrowArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryFindFirstBudgetArgs = {
  cursor?: InputMaybe<BudgetWhereUniqueInput>;
  distinct?: InputMaybe<Array<BudgetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BudgetOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BudgetWhereInput>;
};


export type QueryFindFirstBudgetOrThrowArgs = {
  cursor?: InputMaybe<BudgetWhereUniqueInput>;
  distinct?: InputMaybe<Array<BudgetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BudgetOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BudgetWhereInput>;
};


export type QueryFindFirstCategoryArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryFindFirstCategoryOrThrowArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryFindFirstExpenseArgs = {
  cursor?: InputMaybe<ExpenseWhereUniqueInput>;
  distinct?: InputMaybe<Array<ExpenseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type QueryFindFirstExpenseOrThrowArgs = {
  cursor?: InputMaybe<ExpenseWhereUniqueInput>;
  distinct?: InputMaybe<Array<ExpenseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type QueryFindFirstGoalArgs = {
  cursor?: InputMaybe<GoalWhereUniqueInput>;
  distinct?: InputMaybe<Array<GoalScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GoalOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GoalWhereInput>;
};


export type QueryFindFirstGoalOrThrowArgs = {
  cursor?: InputMaybe<GoalWhereUniqueInput>;
  distinct?: InputMaybe<Array<GoalScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GoalOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GoalWhereInput>;
};


export type QueryFindFirstIncomeArgs = {
  cursor?: InputMaybe<IncomeWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncomeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};


export type QueryFindFirstIncomeOrThrowArgs = {
  cursor?: InputMaybe<IncomeWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncomeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};


export type QueryFindFirstScheduleArgs = {
  cursor?: InputMaybe<ScheduleWhereUniqueInput>;
  distinct?: InputMaybe<Array<ScheduleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ScheduleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduleWhereInput>;
};


export type QueryFindFirstScheduleOrThrowArgs = {
  cursor?: InputMaybe<ScheduleWhereUniqueInput>;
  distinct?: InputMaybe<Array<ScheduleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ScheduleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduleWhereInput>;
};


export type QueryFindFirstSourceArgs = {
  cursor?: InputMaybe<SourceWhereUniqueInput>;
  distinct?: InputMaybe<Array<SourceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SourceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SourceWhereInput>;
};


export type QueryFindFirstSourceOrThrowArgs = {
  cursor?: InputMaybe<SourceWhereUniqueInput>;
  distinct?: InputMaybe<Array<SourceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SourceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SourceWhereInput>;
};


export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindFirstUserOrThrowArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryGetAccountArgs = {
  where: AccountWhereUniqueInput;
};


export type QueryGetBudgetArgs = {
  where: BudgetWhereUniqueInput;
};


export type QueryGetCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryGetExpenseArgs = {
  where: ExpenseWhereUniqueInput;
};


export type QueryGetGoalArgs = {
  where: GoalWhereUniqueInput;
};


export type QueryGetIncomeArgs = {
  where: IncomeWhereUniqueInput;
};


export type QueryGetScheduleArgs = {
  where: ScheduleWhereUniqueInput;
};


export type QueryGetSourceArgs = {
  where: SourceWhereUniqueInput;
};


export type QueryGetUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryGoalArgs = {
  where: GoalWhereUniqueInput;
};


export type QueryGoalsArgs = {
  cursor?: InputMaybe<GoalWhereUniqueInput>;
  distinct?: InputMaybe<Array<GoalScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GoalOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GoalWhereInput>;
};


export type QueryGroupByAccountArgs = {
  by: Array<AccountScalarFieldEnum>;
  having?: InputMaybe<AccountScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<AccountOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryGroupByBudgetArgs = {
  by: Array<BudgetScalarFieldEnum>;
  having?: InputMaybe<BudgetScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<BudgetOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BudgetWhereInput>;
};


export type QueryGroupByCategoryArgs = {
  by: Array<CategoryScalarFieldEnum>;
  having?: InputMaybe<CategoryScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<CategoryOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryGroupByExpenseArgs = {
  by: Array<ExpenseScalarFieldEnum>;
  having?: InputMaybe<ExpenseScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type QueryGroupByGoalArgs = {
  by: Array<GoalScalarFieldEnum>;
  having?: InputMaybe<GoalScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<GoalOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GoalWhereInput>;
};


export type QueryGroupByIncomeArgs = {
  by: Array<IncomeScalarFieldEnum>;
  having?: InputMaybe<IncomeScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};


export type QueryGroupByScheduleArgs = {
  by: Array<ScheduleScalarFieldEnum>;
  having?: InputMaybe<ScheduleScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ScheduleOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduleWhereInput>;
};


export type QueryGroupBySourceArgs = {
  by: Array<SourceScalarFieldEnum>;
  having?: InputMaybe<SourceScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SourceOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SourceWhereInput>;
};


export type QueryGroupByUserArgs = {
  by: Array<UserScalarFieldEnum>;
  having?: InputMaybe<UserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryIncomeArgs = {
  where: IncomeWhereUniqueInput;
};


export type QueryIncomesArgs = {
  cursor?: InputMaybe<IncomeWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncomeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};


export type QueryScheduleArgs = {
  where: ScheduleWhereUniqueInput;
};


export type QuerySchedulesArgs = {
  cursor?: InputMaybe<ScheduleWhereUniqueInput>;
  distinct?: InputMaybe<Array<ScheduleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ScheduleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduleWhereInput>;
};


export type QuerySourceArgs = {
  where: SourceWhereUniqueInput;
};


export type QuerySourcesArgs = {
  cursor?: InputMaybe<SourceWhereUniqueInput>;
  distinct?: InputMaybe<Array<SourceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SourceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SourceWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export type Schedule = {
  __typename?: 'Schedule';
  _count?: Maybe<ScheduleCount>;
  expenses: Array<Expense>;
  incomes: Array<Income>;
  name: Scalars['String']['output'];
};


export type ScheduleExpensesArgs = {
  cursor?: InputMaybe<ExpenseWhereUniqueInput>;
  distinct?: InputMaybe<Array<ExpenseScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ExpenseOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExpenseWhereInput>;
};


export type ScheduleIncomesArgs = {
  cursor?: InputMaybe<IncomeWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncomeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};

export type ScheduleCount = {
  __typename?: 'ScheduleCount';
  expenses: Scalars['Int']['output'];
  incomes: Scalars['Int']['output'];
};


export type ScheduleCountExpensesArgs = {
  where?: InputMaybe<ExpenseWhereInput>;
};


export type ScheduleCountIncomesArgs = {
  where?: InputMaybe<IncomeWhereInput>;
};

export type ScheduleCountAggregate = {
  __typename?: 'ScheduleCountAggregate';
  _all: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type ScheduleCountOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
};

export type ScheduleCreateInput = {
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutScheduleInput>;
  incomes?: InputMaybe<IncomeCreateNestedManyWithoutScheduleInput>;
  name: Scalars['String']['input'];
};

export type ScheduleCreateNestedOneWithoutExpensesInput = {
  connect?: InputMaybe<ScheduleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ScheduleCreateOrConnectWithoutExpensesInput>;
  create?: InputMaybe<ScheduleCreateWithoutExpensesInput>;
};

export type ScheduleCreateNestedOneWithoutIncomesInput = {
  connect?: InputMaybe<ScheduleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ScheduleCreateOrConnectWithoutIncomesInput>;
  create?: InputMaybe<ScheduleCreateWithoutIncomesInput>;
};

export type ScheduleCreateOrConnectWithoutExpensesInput = {
  create: ScheduleCreateWithoutExpensesInput;
  where: ScheduleWhereUniqueInput;
};

export type ScheduleCreateOrConnectWithoutIncomesInput = {
  create: ScheduleCreateWithoutIncomesInput;
  where: ScheduleWhereUniqueInput;
};

export type ScheduleCreateWithoutExpensesInput = {
  incomes?: InputMaybe<IncomeCreateNestedManyWithoutScheduleInput>;
  name: Scalars['String']['input'];
};

export type ScheduleCreateWithoutIncomesInput = {
  expenses?: InputMaybe<ExpenseCreateNestedManyWithoutScheduleInput>;
  name: Scalars['String']['input'];
};

export type ScheduleGroupBy = {
  __typename?: 'ScheduleGroupBy';
  _count?: Maybe<ScheduleCountAggregate>;
  _max?: Maybe<ScheduleMaxAggregate>;
  _min?: Maybe<ScheduleMinAggregate>;
  name: Scalars['String']['output'];
};

export type ScheduleMaxAggregate = {
  __typename?: 'ScheduleMaxAggregate';
  name?: Maybe<Scalars['String']['output']>;
};

export type ScheduleMaxOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
};

export type ScheduleMinAggregate = {
  __typename?: 'ScheduleMinAggregate';
  name?: Maybe<Scalars['String']['output']>;
};

export type ScheduleMinOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
};

export type ScheduleOrderByWithAggregationInput = {
  _count?: InputMaybe<ScheduleCountOrderByAggregateInput>;
  _max?: InputMaybe<ScheduleMaxOrderByAggregateInput>;
  _min?: InputMaybe<ScheduleMinOrderByAggregateInput>;
  name?: InputMaybe<SortOrder>;
};

export type ScheduleOrderByWithRelationInput = {
  expenses?: InputMaybe<ExpenseOrderByRelationAggregateInput>;
  incomes?: InputMaybe<IncomeOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
};

export type ScheduleRelationFilter = {
  is?: InputMaybe<ScheduleWhereInput>;
  isNot?: InputMaybe<ScheduleWhereInput>;
};

export enum ScheduleScalarFieldEnum {
  Name = 'name'
}

export type ScheduleScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ScheduleScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ScheduleScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ScheduleScalarWhereWithAggregatesInput>>;
  name?: InputMaybe<StringWithAggregatesFilter>;
};

export type ScheduleUpdateInput = {
  expenses?: InputMaybe<ExpenseUpdateManyWithoutScheduleNestedInput>;
  incomes?: InputMaybe<IncomeUpdateManyWithoutScheduleNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ScheduleUpdateManyMutationInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ScheduleUpdateOneRequiredWithoutExpensesNestedInput = {
  connect?: InputMaybe<ScheduleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ScheduleCreateOrConnectWithoutExpensesInput>;
  create?: InputMaybe<ScheduleCreateWithoutExpensesInput>;
  update?: InputMaybe<ScheduleUpdateToOneWithWhereWithoutExpensesInput>;
  upsert?: InputMaybe<ScheduleUpsertWithoutExpensesInput>;
};

export type ScheduleUpdateOneRequiredWithoutIncomesNestedInput = {
  connect?: InputMaybe<ScheduleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ScheduleCreateOrConnectWithoutIncomesInput>;
  create?: InputMaybe<ScheduleCreateWithoutIncomesInput>;
  update?: InputMaybe<ScheduleUpdateToOneWithWhereWithoutIncomesInput>;
  upsert?: InputMaybe<ScheduleUpsertWithoutIncomesInput>;
};

export type ScheduleUpdateToOneWithWhereWithoutExpensesInput = {
  data: ScheduleUpdateWithoutExpensesInput;
  where?: InputMaybe<ScheduleWhereInput>;
};

export type ScheduleUpdateToOneWithWhereWithoutIncomesInput = {
  data: ScheduleUpdateWithoutIncomesInput;
  where?: InputMaybe<ScheduleWhereInput>;
};

export type ScheduleUpdateWithoutExpensesInput = {
  incomes?: InputMaybe<IncomeUpdateManyWithoutScheduleNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ScheduleUpdateWithoutIncomesInput = {
  expenses?: InputMaybe<ExpenseUpdateManyWithoutScheduleNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ScheduleUpsertWithoutExpensesInput = {
  create: ScheduleCreateWithoutExpensesInput;
  update: ScheduleUpdateWithoutExpensesInput;
  where?: InputMaybe<ScheduleWhereInput>;
};

export type ScheduleUpsertWithoutIncomesInput = {
  create: ScheduleCreateWithoutIncomesInput;
  update: ScheduleUpdateWithoutIncomesInput;
  where?: InputMaybe<ScheduleWhereInput>;
};

export type ScheduleWhereInput = {
  AND?: InputMaybe<Array<ScheduleWhereInput>>;
  NOT?: InputMaybe<Array<ScheduleWhereInput>>;
  OR?: InputMaybe<Array<ScheduleWhereInput>>;
  expenses?: InputMaybe<ExpenseListRelationFilter>;
  incomes?: InputMaybe<IncomeListRelationFilter>;
  name?: InputMaybe<StringFilter>;
};

export type ScheduleWhereUniqueInput = {
  AND?: InputMaybe<Array<ScheduleWhereInput>>;
  NOT?: InputMaybe<Array<ScheduleWhereInput>>;
  OR?: InputMaybe<Array<ScheduleWhereInput>>;
  expenses?: InputMaybe<ExpenseListRelationFilter>;
  incomes?: InputMaybe<IncomeListRelationFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Source = {
  __typename?: 'Source';
  Income: Array<Income>;
  _count?: Maybe<SourceCount>;
  name: Scalars['String']['output'];
};


export type SourceIncomeArgs = {
  cursor?: InputMaybe<IncomeWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncomeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncomeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IncomeWhereInput>;
};

export type SourceCount = {
  __typename?: 'SourceCount';
  Income: Scalars['Int']['output'];
};


export type SourceCountIncomeArgs = {
  where?: InputMaybe<IncomeWhereInput>;
};

export type SourceCountAggregate = {
  __typename?: 'SourceCountAggregate';
  _all: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type SourceCountOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
};

export type SourceCreateInput = {
  Income?: InputMaybe<IncomeCreateNestedManyWithoutSourceInput>;
  name: Scalars['String']['input'];
};

export type SourceCreateNestedOneWithoutIncomeInput = {
  connect?: InputMaybe<SourceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SourceCreateOrConnectWithoutIncomeInput>;
  create?: InputMaybe<SourceCreateWithoutIncomeInput>;
};

export type SourceCreateOrConnectWithoutIncomeInput = {
  create: SourceCreateWithoutIncomeInput;
  where: SourceWhereUniqueInput;
};

export type SourceCreateWithoutIncomeInput = {
  name: Scalars['String']['input'];
};

export type SourceGroupBy = {
  __typename?: 'SourceGroupBy';
  _count?: Maybe<SourceCountAggregate>;
  _max?: Maybe<SourceMaxAggregate>;
  _min?: Maybe<SourceMinAggregate>;
  name: Scalars['String']['output'];
};

export type SourceMaxAggregate = {
  __typename?: 'SourceMaxAggregate';
  name?: Maybe<Scalars['String']['output']>;
};

export type SourceMaxOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
};

export type SourceMinAggregate = {
  __typename?: 'SourceMinAggregate';
  name?: Maybe<Scalars['String']['output']>;
};

export type SourceMinOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
};

export type SourceOrderByWithAggregationInput = {
  _count?: InputMaybe<SourceCountOrderByAggregateInput>;
  _max?: InputMaybe<SourceMaxOrderByAggregateInput>;
  _min?: InputMaybe<SourceMinOrderByAggregateInput>;
  name?: InputMaybe<SortOrder>;
};

export type SourceOrderByWithRelationInput = {
  Income?: InputMaybe<IncomeOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
};

export type SourceRelationFilter = {
  is?: InputMaybe<SourceWhereInput>;
  isNot?: InputMaybe<SourceWhereInput>;
};

export enum SourceScalarFieldEnum {
  Name = 'name'
}

export type SourceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SourceScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SourceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SourceScalarWhereWithAggregatesInput>>;
  name?: InputMaybe<StringWithAggregatesFilter>;
};

export type SourceUpdateInput = {
  Income?: InputMaybe<IncomeUpdateManyWithoutSourceNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SourceUpdateManyMutationInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SourceUpdateOneRequiredWithoutIncomeNestedInput = {
  connect?: InputMaybe<SourceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SourceCreateOrConnectWithoutIncomeInput>;
  create?: InputMaybe<SourceCreateWithoutIncomeInput>;
  update?: InputMaybe<SourceUpdateToOneWithWhereWithoutIncomeInput>;
  upsert?: InputMaybe<SourceUpsertWithoutIncomeInput>;
};

export type SourceUpdateToOneWithWhereWithoutIncomeInput = {
  data: SourceUpdateWithoutIncomeInput;
  where?: InputMaybe<SourceWhereInput>;
};

export type SourceUpdateWithoutIncomeInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SourceUpsertWithoutIncomeInput = {
  create: SourceCreateWithoutIncomeInput;
  update: SourceUpdateWithoutIncomeInput;
  where?: InputMaybe<SourceWhereInput>;
};

export type SourceWhereInput = {
  AND?: InputMaybe<Array<SourceWhereInput>>;
  Income?: InputMaybe<IncomeListRelationFilter>;
  NOT?: InputMaybe<Array<SourceWhereInput>>;
  OR?: InputMaybe<Array<SourceWhereInput>>;
  name?: InputMaybe<StringFilter>;
};

export type SourceWhereUniqueInput = {
  AND?: InputMaybe<Array<SourceWhereInput>>;
  Income?: InputMaybe<IncomeListRelationFilter>;
  NOT?: InputMaybe<Array<SourceWhereInput>>;
  OR?: InputMaybe<Array<SourceWhereInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  accounts: Array<Account>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type UserAccountsArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountWhereInput>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type UserAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserCount = {
  __typename?: 'UserCount';
  accounts: Scalars['Int']['output'];
};


export type UserCountAccountsArgs = {
  where?: InputMaybe<AccountWhereInput>;
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type UserCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateNestedOneWithoutAccountsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<UserCreateWithoutAccountsInput>;
};

export type UserCreateOrConnectWithoutAccountsInput = {
  create: UserCreateWithoutAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAccountsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserGroupBy = {
  __typename?: 'UserGroupBy';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  accounts?: InputMaybe<AccountOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type UserSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserUpdateInput = {
  accounts?: InputMaybe<AccountUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<UserCreateWithoutAccountsInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutAccountsInput>;
  upsert?: InputMaybe<UserUpsertWithoutAccountsInput>;
};

export type UserUpdateToOneWithWhereWithoutAccountsInput = {
  data: UserUpdateWithoutAccountsInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateWithoutAccountsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithoutAccountsInput = {
  create: UserCreateWithoutAccountsInput;
  update: UserUpdateWithoutAccountsInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GetUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name: string, email: string, accounts: Array<{ __typename?: 'Account', id: number, name: string }> } | null };


export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;