export const capitlizeFn = ({ text = '' }) => {
  const textCapitalize = `${text.substring(0, 1).toUpperCase()}${text.substring(
		1
	)}`
  return textCapitalize
}
