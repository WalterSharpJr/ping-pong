export interface RequestResult
{
 	success: boolean;
	resultCode: number;
}

export interface TypedRequestResult<T> extends RequestResult
{
	data: T;
	totalPages: number;
}
