export type UdidDeviceInfo = {
  udid?: string;
  product?: string;
  version?: string;
  deviceName?: string;
  serial?: string;
  imei?: string;
  raw?: string;
  createdAt: string;
};

type StoreShape = Map<string, UdidDeviceInfo>;

const globalForUdid = globalThis as unknown as { n1UdidStore?: StoreShape };

export const udidStore: StoreShape = globalForUdid.n1UdidStore ?? new Map<string, UdidDeviceInfo>();

globalForUdid.n1UdidStore = udidStore;
