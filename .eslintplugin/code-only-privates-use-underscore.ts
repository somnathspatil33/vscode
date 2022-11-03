/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as eslint from 'eslint';

export = new class OnlyPrivatesUseUnderscorePrefix implements eslint.Rule.RuleModule {

	create(context: eslint.Rule.RuleContext): eslint.Rule.RuleListener {
		return {
			['PropertyDefinition[key.name=/^_.*/]:not([accessibility="private"])']: (node: any) => {

				if (String(node.key.name).endsWith('Brand')) {
					return;
				}

				return context.report({
					node: node.key,
					message: 'Properties starting with an underscore should be marked as private'
				});
			}
		};
	}
};