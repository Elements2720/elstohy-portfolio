type Value={stringValue?:string;integerValue?:string;doubleValue?:number;booleanValue?:boolean;nullValue?:null;timestampValue?:string;arrayValue?:{values?:Value[]};mapValue?:{fields?:Record<string,Value>}};
export function decodeValue(value:Value):unknown{
 if('stringValue'in value)return value.stringValue;if('integerValue'in value)return Number(value.integerValue);if('doubleValue'in value)return value.doubleValue;if('booleanValue'in value)return value.booleanValue;if('timestampValue'in value)return value.timestampValue;if('nullValue'in value)return null;
 if(value.arrayValue)return (value.arrayValue.values??[]).map(decodeValue);
 return decodeFields(value.mapValue?.fields??{});
}
export function decodeFields(fields:Record<string,Value>):Record<string,unknown>{return Object.fromEntries(Object.entries(fields).map(([k,v])=>[k,decodeValue(v)]));}
export function firestoreBase(){const id=process.env.FIREBASE_PROJECT_ID||process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;if(!id)throw new Error('Missing Firebase project configuration.');const emulator=process.env.NODE_ENV==='development'&&process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST;const origin=emulator?`http://${emulator}:8080`:'https://firestore.googleapis.com';return `${origin}/v1/projects/${encodeURIComponent(id)}/databases/(default)/documents`;}
