// @ts-nocheck

module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"plugin:react/recommended",
		"standard-with-typescript"
	],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"semi": ["error", "never"],
		"no-tabs": "off",
		"indent": ["error", "tab"],
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/space-before-function-paren": "off",
		"@typescript-eslint/strict-boolean-expressions": "off"
	}
}
