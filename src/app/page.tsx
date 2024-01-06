import { Tweet } from '@/components/tweet'
import config from './config'

export default function Home() {
  return (
    <main className='min-h-[calc(100vh-3rem)] w-screen flex flex-col justify-center py-20 px-10 space-y-8'>
      <h1 className='text-4xl font-bold max-w-prose'>{config.title}</h1>
      <p className='text-xl max-w-prose'>{config.description}</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {config.tweets.map((tweet) => (
          <Tweet key={tweet} id={tweet} />
        ))}
      </div>
    </main>
  )
}
