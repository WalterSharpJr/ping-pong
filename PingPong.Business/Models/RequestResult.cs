namespace PingPong.Business.Models
{
    public class RequestResult<T>
    {
		public bool Success { get; set; }
		public int ResultCode { get; set; }
		public T Data { get; set; }

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

		public void SetFail(int code)
		{
			Success = false;
			ResultCode = code;			
		}
	}
}