
import Posts from '../containers/Posts'
import Sidebar from '../components/Sidebar'
const Home = () => {

  return (
    <>
      <div className="container mx-auto flex pt-4">
        <h1>Recent Posts</h1>
        <Posts />
        <Sidebar />
      </div>
    </>



  )
}

export default Home
