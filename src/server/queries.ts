// === This should be imported
// import {
//     dbSchema,
//     fooCreateZod,
//     type FooSchema,
// } from "@/server/db/schema";
// import { db } from "./db/postgres";

// === This is what 'Unambiguous imports on the fly:' imports
//import {db} from "@/server/db/postgres";

// === After some time fiddling around with this test setup it imports now this by its own
// import {db} from "@/server/db/postgres";
// import {dbSchema} from "@/server/db/schema";

// After trying "Import all"-Action which worked this time (even in the real project). After this action even the auto-import suddenly knows what to import
import {db} from "@/server/db/postgres";
import {dbSchema, fooCreateZod, FooSchema} from "@/server/db/schema";

export const foo = async (data: FooSchema) => {
    console.log(data);

    try {
        // === EsLint errors prioritized over import-quick-fix
        const insertData = fooCreateZod.parse(data);
        await db.insert(dbSchema).values(insertData);

        const reportedFoundsList = await db.query.dbSchema.findMany({
            orderBy: (model, { desc }) => desc(model.id),
        });
        console.log("reportedFoundsList", reportedFoundsList);
    } catch (e) {
        console.log(e);
    }
    return;
};
