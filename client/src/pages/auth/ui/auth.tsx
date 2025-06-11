import { PageLoader } from '@/shared/ui/loaders'
import Link from 'antd/es/typography/Link'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, useState } from 'react'
import FormAuth from './form.auth'
const Auth = () => {
	const [isLogining, setIsLogining] = useState(true)

	return (
		<Suspense fallback={<PageLoader />}>
			<motion.main
				className={`w-dvw h-dvh flex ${
					isLogining ? 'sm:flex-row' : 'sm:flex-row-reverse'
				} flex-col-reverse justify-center items-center gap-5 sm:gap-20 `}
			>
				<AnimatePresence>
					<motion.div
						initial={{ x: '-150px', opacity: 0 }}
						animate={{ x: '0px', opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1, ease: 'easeOut' }}
						className='bg-gray-50 p-7 rounded-xl shadow-md'
					>
						<FormAuth isLogining={isLogining} />
					</motion.div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, ease: 'easeOut' }}
						className='max-w-[300px] '
					>
						<h1 className='text-3xl font-bold pb-6 text-center'>
							{isLogining ? 'Login now!' : 'Register'}
						</h1>
						<div>
							<p className='text-justify sm:block hidden'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
								minima! Officiis quos sit a impedit veritatis maiores similique
								corrupti consectetur, iusto distinctio est atque ea suscipit
								aperiam error cum cupiditate!
							</p>
							<Link onClick={() => setIsLogining(prev => !prev)}>
								{isLogining
									? 'Create a new account.'
									: 'Log into existing account'}
							</Link>
						</div>
					</motion.div>
				</AnimatePresence>
			</motion.main>
		</Suspense>
	)
}

export default Auth
