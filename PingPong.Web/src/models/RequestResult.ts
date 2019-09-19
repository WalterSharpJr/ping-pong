export interface RequestResult
{
 	Success: boolean;
	ResultCode: boolean;
}

export interface TypedRequestResult<T> extends RequestResult
{
	Data: T;
}
