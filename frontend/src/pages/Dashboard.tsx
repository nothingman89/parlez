import obelix from '../assets/obelix.webp'

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-8">
      <img src={obelix} alt="Obelix" className="h-[576px] mb-10 mix-blend-multiply" />
      <blockquote className="text-3xl font-bold text-[#3D5A7A] max-w-xl leading-snug">
        "I live in the moment because I can only speak French in the present tense"
      </blockquote>
    </div>
  )
}
