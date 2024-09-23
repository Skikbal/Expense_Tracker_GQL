import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDefs.js";
import transactionTypeDef from "./transaction.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;

//why merge type defination

/*
Modularity: Merging type defination allows you to keep related schema component in seprate files,promoting
modularitry and organisation

Esier Collabration: if multiple developers are working on differnt parts of the schema,
merging seprate trype definatrion can make it easier to collabrate without conflicts.

Reuse: you can reuse type defination across different parts of the schema, potentially reducing duplication.

clear sepration of concerns: Each file xcan focous on a specific domain or type of data, makig it easier to understand and maintain

 */
