type IData = {
  email: string
  amount: string
}

type IInitialize = (secret: string, data: IData) => Promise<any>
export const initialize: IInitialize = async (secret, data) => {
  try {
    const response = await fetch(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${secret}`,
        },
        body: JSON.stringify(data),
      }
    )
    return response.json()
  } catch (error) {
    console.log(error)
    return error
  }
}
