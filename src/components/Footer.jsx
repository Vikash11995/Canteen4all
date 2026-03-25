import React from 'react'

const Footer = () => {
  return (
    <div>
       <footer className="bg-[#F3F4F4] text-zinc-600 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-16">
          <div>
            <h4 className="font-bold text-lg mb-2">Canteen4All</h4>
            <p className="text-sm">Crunchy and Delicious Snacks </p><p className="text-gray-700/80">Bye Bye Hunger.</p> 
          </div>
          <div className="">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="/home">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">About</a></li>
              <li><a href="tel:+917678325879">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm">vikashyadav11995@gmail.com</p>
            <p className="text-sm">+91 76783 25879</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer