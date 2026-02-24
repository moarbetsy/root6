import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: '#FFFDF5' }}>
      <Card className="w-full max-w-lg mx-4 shadow-lg border border-gray-100 bg-white">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-pulse opacity-30" style={{ backgroundColor: '#C1E1C1' }} />
              <AlertCircle className="relative h-16 w-16" style={{ color: '#5D4037' }} />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2" style={{ color: '#5D4037' }}>404</h1>

          <h2 className="text-xl font-semibold mb-4 opacity-80">
            Page Not Found
          </h2>

          <p className="opacity-80 mb-8 leading-relaxed">
            Sorry, the page you are looking for doesn&apos;t exist.
            <br />
            It may have been moved or deleted.
          </p>

          <Link href="/">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform" style={{ backgroundColor: '#C1E1C1', color: '#5D4037' }}>
              <Home className="w-4 h-4" />
              Go Home
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
