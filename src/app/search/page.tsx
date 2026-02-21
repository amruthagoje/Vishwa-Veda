
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, Star, Filter, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MOCK_DOCTORS = [
  {
    id: 1,
    name: 'Dr. Arya Sharma',
    specialty: 'Panchakarma Expert',
    city: 'Rishikesh',
    rating: 4.9,
    reviews: 124,
    price: '$45/session',
    imgId: 'doctor-1',
    tags: ['Detox', 'Wellness']
  },
  {
    id: 2,
    name: 'Dr. Vikram Veda',
    specialty: 'Ayurvedic Surgery',
    city: 'Kerala',
    rating: 4.8,
    reviews: 89,
    price: '$60/session',
    imgId: 'doctor-2',
    tags: ['Surgery', 'Healing']
  },
  {
    id: 3,
    name: 'Dr. Meera Iyer',
    specialty: 'Diet & Nutrition',
    city: 'Bengaluru',
    rating: 4.7,
    reviews: 215,
    price: '$35/session',
    imgId: 'doctor-1',
    tags: ['Diet', 'Obesity']
  },
  {
    id: 4,
    name: 'Dr. Rajesh Nair',
    specialty: 'Internal Medicine',
    city: 'Kerala',
    rating: 4.9,
    reviews: 310,
    price: '$55/session',
    imgId: 'doctor-2',
    tags: ['Chronic', 'Pain']
  }
];

export default function DoctorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('all');

  const filteredDoctors = MOCK_DOCTORS.filter(doc => 
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterCity === 'all' || doc.city === filterCity)
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Find Your Practitioner</h1>
          <p className="text-muted-foreground">Search through vetted Ayurvedic specialists across India.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Doctor, therapy, or symptom..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="Rishikesh">Rishikesh</SelectItem>
              <SelectItem value="Kerala">Kerala</SelectItem>
              <SelectItem value="Bengaluru">Bengaluru</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDoctors.map((doc) => (
            <Card key={doc.id} className="overflow-hidden hover:shadow-xl transition-all border-primary/5 flex flex-col">
              <div className="relative h-48 w-full bg-muted">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === doc.imgId)?.imageUrl || ''} 
                  alt={doc.name} 
                  fill 
                  className="object-cover"
                  data-ai-hint="doctor ayurvedic portrait"
                />
                <Badge className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white">
                  {doc.price}
                </Badge>
              </div>
              <CardHeader className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-primary">{doc.name}</CardTitle>
                    <p className="text-sm text-accent font-medium">{doc.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold bg-accent/10 px-2 py-1 rounded text-accent">
                    <Star className="h-3 w-3 fill-accent" />
                    {doc.rating}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 text-accent" />
                  {doc.city}
                </div>
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-secondary/10 text-secondary-foreground text-[10px] font-bold">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button className="w-full gap-2 bg-primary">
                  <CalendarCheck className="h-4 w-4" />
                  Book Consultation
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/20 rounded-3xl">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-bold text-primary">No practitioners found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
