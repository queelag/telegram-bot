const Regex = {
  id: new RegExp(/^[a-z0-9]{16}$/),
  command: new RegExp(/^\/[a-z_]+/)
}

export default Regex
