import { auth } from "@clerk/nextjs"
import Dropzone from "@/components/Dropzone"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typing";
import FilesTable from "@/components/ContentTable/FilesTable";

async function Dasboard() {
    const { userId } = auth();
    const docsResults = await getDocs(collection(db, "users", userId!, "files"))
    const skeletonFiles: FileType[] = docsResults.docs.map(doc => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size,
    }));

    console.log(skeletonFiles)
    return (
        <div className="border-t">
            <Dropzone />
            <section className="container space-y-5">
                <h1 className="font-semibold">All Files</h1>

                <div>

                    <FilesTable skeletonFiles={skeletonFiles} />
                </div>

            </section>
        </div>
    )
}


export default Dasboard





