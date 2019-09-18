namespace PingPong.Business.Models
{
	public class RequestResult
    {
		public bool Success { get; set; }
		public int ResultCode { get; set; }

		public RequestResult()
		{
			Success = false;
		}

		public RequestResult(bool success)
		{
			Success = success;
		}

		public RequestResult(bool success, int resultCode)
		{
			Success = success;
			ResultCode = resultCode;
		}

		public void SetFail(int code)
		{
			Success = false;
			ResultCode = code;			
		}

		public static RequestResult GetSuccess()
		{
			return new Models.RequestResult(true, 200);
		}

		public static RequestResult GetFail(int code)
		{
			return new Models.RequestResult(false, code);
		}
	}

    public class RequestResult<T>: RequestResult
    {
		
		public T Data { get; set; }
		
		public RequestResult(bool success, int resultCode, T data)
		{
			Success = success;
			ResultCode = resultCode;
			Data = data;
		}

		public void SetSuccess(T data)
		{
			Success = true;
			ResultCode = 200;
			Data = data;
		}

		public static RequestResult<T> GetSuccess(T data)
		{
			return new Models.RequestResult<T>(true, 200, data);
		}

		public static RequestResult<T> GetSuccess(int code, T data)
		{
			return new Models.RequestResult<T>(true, code, data);
		}

		public static RequestResult<T> GetFail(int code, T data)
		{
			return new Models.RequestResult<T>(false, code, data);
		}
	}
}