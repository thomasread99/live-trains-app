class ServiceInformation {
	serviceUid: string;
	runDate: Date;
	serviceType: string;
	isPassenger: boolean;
	trainIdentity: string;
	powerType: string;
	trainClass?: string;
	sleeper?: string;
	atocCode: string;
	atocName: string;
	performanceMonitored: boolean;
	origin: Pair[];
	destination: Pair[];
	locations: LocationObj[];
	realtimeActivated: boolean;
	runningIdentity: string;
}
