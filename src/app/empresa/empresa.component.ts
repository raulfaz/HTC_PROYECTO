import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [ CommonModule,MatCardModule, MatButtonModule,MatIconModule,MatGridListModule,MatTabsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

  cards = [
    { 
      icon: 'star',
      title: 'Calidad', 
      content: 'Ofrecemos instrumentos musicales de la más alta calidad, garantizando durabilidad y precisión en cada nota, para que disfrutes de la mejor experiencia sonora posible.',
    },
    { 
      icon: 'lightbulb',
      title: 'Servicio', 
      content: 'Nuestro servicio al cliente se enfoca en brindar atención personalizada, asesoramiento experto y soporte postventa para asegurar que cada compra y experiencia musical sea excepcional.',
    },
    { 
      icon: 'home',
      title: 'Innovar', 
      content: 'Nos esforzamos siempre, incorporando los últimos avances en tecnología musical y ofreciendo productos y servicios únicos para satisfacer las necesidades.',
    }
  ];
  services = [
    { title: 'Asesoría', description: 'Ofrecemos un servicio de asesoría personalizada para ayudarte a elegir el instrumento musical que mejor se adapte a tus necesidades.' },
    { title: 'Reparación', description: 'Proporcionamos servicios completos de reparación y mantenimiento para todos los tipos de instrumentos musicales.' },
    { title: 'Clases', description: 'Ofrecemos clases de música para una variedad de instrumentos, incluyendo guitarra, piano, batería, y muchos más.' },
    { title: 'Venta', description: 'Disponemos de una amplia gama de accesorios y equipos de sonido para complementar tu instrumento musical de cualquier marca.' },
  ];
  servicios = [
    { 
      image: "", 
      name: "Energía Solar", 
      "description": "Soluciones que incluyen paneles solares y generadores solares para aprovechar la energía del sol, ofreciendo alternativas sostenibles para la generación de electricidad."
    },
    { 
      image: "", 
      name: "Herraje", 
      description: "Accesorios y componentes metálicos que proporcionan soporte y fijación para instalaciones eléctricas, garantizando seguridad y estabilidad en sistemas eléctricos."
    },
    { 
      image: "", 
      name: "Iluminación Externa", 
      description: "Luminarias y sistemas diseñados para iluminar espacios exteriores, como calles y áreas públicas, combinando eficiencia energética y durabilidad."
    },
    { 
      image: "", 
      name: "Control Eléctrico", 
      description: "Dispositivos y sistemas para gestionar y automatizar circuitos eléctricos, asegurando un funcionamiento seguro y eficiente en instalaciones eléctricas."
    },
    {
      image: "", 
      name: "Herramientas y Materiales Eléctricos", 
      description: "Herramientas especializadas y materiales necesarios para la instalación, mantenimiento y reparación de sistemas eléctricos en diversas aplicaciones."
    },
    { 
      image: "", 
      name: "Cables", 
      description: "Conductores eléctricos de alta calidad utilizados para la transmisión de energía en instalaciones residenciales, comerciales e industriales."
    },
    { 
      image: "", 
      name: "Instalación Eléctrica Interna", 
      description: "Componentes y sistemas para la instalación de redes eléctricas dentro de edificios, asegurando cumplimiento de normas y seguridad."
    },
    { 
      image: "", 
      name: "Iluminación Interna", 
      description: "Soluciones de iluminación para espacios interiores, ofreciendo una amplia gama de lámparas y sistemas que combinan eficiencia y estilo."
    }
  ]

}
