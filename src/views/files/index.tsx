import Layout from "../../components/Layout/Layout";
import PublicFilesView from "./publicFiles";
import PrivateFilesView from "./privateFiles";
import SharedFilesView from "./sharedFiles";

const FilesView = () => {
  return (
    <Layout>
      <PublicFilesView />
      <PrivateFilesView />
      <SharedFilesView />
    </Layout>
  )
}

export default FilesView;