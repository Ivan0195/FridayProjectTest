export type AnyObjectType = Record<string, unknown>;

export type ChildrenComponentsType = {
  children: JSX.Element | JSX.Element[] | string | string[];
};

export type ClassNameType = {
  className?: string;
};

export type BaseCommonComponentPropsType = ChildrenComponentsType & ClassNameType;

export type OrdersType = 'desc' | 'asc' | 'default';
