import Link from 'next/link';
import { Auth, Hub } from 'aws-amplify';
import '../../configureAmpllify';
// import { useState } from 'react';

const Navbar = () => {
  let signedUser = false;

  async function authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          signedUser = true;
          break;
        case 'signOut':
          signedUser = false;
          break;
        default:
          break;
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      signedUser = true;
    } catch (error) {
      signedUser = false;
    }
  }

  return (
    <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300">
      {[
        ['Home', '/'],
        ['Create Post', '/create-post'],
        ['Profile', '/profile'],
      ].map(([title, url], index) => (
        <Link href={url} key={index}>
          <span className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900">{title}</span>
        </Link>
      ))}
      {signedUser && (
        <Link href="/my-post">
          <span className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900">My Post</span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
