const object = `{
  value: '123'
}`

export function exception1 () {
  try {
    const result = JSON.parse(object)
    console.log(result)
  } catch (error) {
      throw error
  }
}