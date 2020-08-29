const tcp = <T>(f: () => Promise<T>): Promise<T | Error> => {
  return new Promise((resolve) => {
    f()
      .then((v: T) => resolve(v))
      .catch((e: any) => resolve(new Error(e)))
  })
}

export default tcp
