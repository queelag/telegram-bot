const Regex = {
  array: /^\[.+\]$/,
  command: /\/[a-z_]+/m,
  command_with_username: /\/[a-zA-Z0-9_@]+/,
  id: /^[a-z0-9]{16}$/,
  number: /^(\+|-)?[0-9]+\.?[0-9]+$/,
  object: /^\{.+\}$/,
  repliable_chat_id: /:\s(\+|-)?[0-9]+/m,
  username: /[a-zA-Z_0-9]{5,32}/
}

export default Regex
