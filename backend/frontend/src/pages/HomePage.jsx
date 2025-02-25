
import CategoryItem from '../components/CategoryItem';
import Banner from '../components/Banner';
// import BestSeller from '../components/BestSeller';
import Category from '../components/Category';
import Collection from '../components/Collection'


const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  return (
	<div className='relative min-h-screen text-white overflow-hidden'>

			<Banner/>
			<Category/>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-black mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-700 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

			
			</div>
			<Collection/>

		</div>
  )
}

export default HomePage;
