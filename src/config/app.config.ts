interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Investor'],
  customerRoles: [],
  tenantRoles: ['Investor'],
  tenantName: 'Investor',
  applicationName: 'ProperTPainting',
  addOns: [],
};
