import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

  currentPosition = 0;
  itemWidth = 320; // Ajuste para el ancho de las tarjetas

  timelineData = [
    {
      icon: 'business',
      year: '2015',
      title: 'Fundación de la empresa',
      description: 'Inicio de operaciones con un equipo profesional enfocado en soluciones eléctricas eficientes.',
      image: "../assets/img-generales/logo.png" // Ruta de la imagen
    },
    {
      icon: 'public',
      year: '2018',
      title: 'Expansión internacional',
      description: 'Nos expandimos hacia nuevos mercados en Latinoamérica, con oficinas en varios países.',
      image: '\..\assets\img-generales\logo-esloga.png'
    },
    {
      icon: 'bolt',
      year: '2020',
      title: 'Innovación y nuevas tecnologías',
      description: 'Introducción de nuevas tecnologías en nuestros servicios, apostando por la innovación.',
      image: '\..\assets\img-generales\logo.png'
    },
    {
      icon: 'engineering',
      year: '2022',
      title: 'Crecimiento del equipo',
      description: 'El equipo de la empresa creció con la incorporación de nuevos especialistas en diversas áreas.',
      image: '\..\assets\img-generales\edificio.jpg'
    },
    {
      icon: 'lightbulb',
      year: '2024',
      title: 'Sostenibilidad y energías renovables',
      description: 'Liderazgo en soluciones sostenibles, con un enfoque en proyectos de energía renovable.',
      image: '\..\assets\img-generales\edificio.jpg'
    }
  ];

  prevSlide() {
    if (this.currentPosition < 0) {
      this.currentPosition += this.itemWidth;
    }
  }

  nextSlide() {
    if (this.currentPosition > -(this.itemWidth * (this.timelineData.length - 1))) {
      this.currentPosition -= this.itemWidth;
    }
  }

  cards = [
    {
      icon: 'engineering',
      title: 'Calidad',
      content: 'Nos comprometemos a entregar soluciones eléctricas con altos estándares de calidad, asegurando la confiabilidad y eficiencia en cada proyecto.',
    },
    {
      icon: 'support_agent',
      title: 'Atención Personalizada',
      content: 'Ofrecemos un servicio de atención al cliente especializado, orientado a cubrir todas tus necesidades, garantizando soporte en cada etapa del proyecto.',
    },
    {
      icon: 'bolt',
      title: 'Innovación',
      content: 'Nos mantenemos a la vanguardia tecnológica, implementando soluciones innovadoras y eficientes para mejorar el rendimiento energético de nuestros clientes.',
    }
  ];


  services = [
    { title: 'Asesoría', description: 'Ofrecemos un servicio de asesoría personalizada para ayudarte a elegir el instrumento musical que mejor se adapte a tus necesidades.' },
    { title: 'Reparación', description: 'Proporcionamos servicios completos de reparación y mantenimiento para todos los tipos de instrumentos musicales.' },
    { title: 'Clases', description: 'Ofrecemos clases de música para una variedad de instrumentos, incluyendo guitarra, piano, batería, y muchos más.' },
    { title: 'Venta', description: 'Disponemos de una amplia gama de accesorios y equipos de sonido para complementar tu instrumento musical de cualquier marca.' },
  ];

  activeIndex = 0;

  nextService() {
    this.activeIndex = (this.activeIndex + 1) % this.servicios.length;
  }

  prevService() {
    this.activeIndex = (this.activeIndex - 1 + this.servicios.length) % this.servicios.length;
  }

  servicios = [
    {
      image: "/../assets/img-servicios/img1.jpg",
      name: "Proyecto Redes de distribución",
      description: "Implementamos redes de baja, media y alta tensión, asegurando una infraestructura de distribución eficiente y segura. Nuestro enfoque está en adaptar cada proyecto a las necesidades específicas de nuestros clientes, utilizando materiales de alta calidad y técnicas innovadoras."
    },
    {
      image: "/../assets/img-servicios/img2.jpeg",
      name: "Proyecto de Alumbrado público",
      description: "Diseñamos y mantenemos sistemas de iluminación en vías públicas, utilizando luminarias de alta calidad para garantizar la seguridad y visibilidad. Nuestra experiencia en el sector nos permite realizar instalaciones duraderas y eficientes, contribuyendo al bienestar de la comunidad."
    },
    {
      image: "/../assets/img-servicios/img3.jpeg",
      name: "Proyecto de Iluminación Ornamental",
      description: "Transformamos espacios con iluminación ornamental, creando ambientes festivos y atractivos mediante el uso de guirnaldas y elementos decorativos. Nos aseguramos de que cada diseño refleje la estética deseada, elevando la experiencia visual en eventos y celebraciones."
    },
    {
      image: "/../assets/img-servicios/img4.jpeg",
      name: "Proyecto de Paneles Solares",
      description: "Instalamos paneles solares para aprovechar energías renovables, reduciendo costos energéticos y contribuyendo a un futuro más sostenible. Nuestro equipo se encarga de cada etapa del proceso, desde la planificación hasta la instalación, garantizando una integración eficiente en tu hogar o negocio."
    },
    {
      image: "/../assets/img-servicios/img5.jpeg",
      name: "Proyecto de Iluminación Residencial",
      description: "Ofrecemos soluciones de iluminación moderna y eficiente para hogares, mejorando la seguridad y creando un ambiente confortable. Nuestro objetivo es personalizar cada instalación, asegurando que cada rincón de tu hogar cuente con la luz adecuada para realzar su belleza."
    },
    {
      image: "/../assets/img-servicios/img6.jpg",
      name: "Proyecto de Control Eléctrico",
      description: "Desarrollamos tableros de control eléctricos personalizados para optimizar la operación en proyectos industriales y comerciales. Trabajamos de la mano con nuestros clientes para diseñar soluciones que maximicen la eficiencia y seguridad de sus instalaciones eléctricas."
    },
    {
      image: "/../assets/img-servicios/img7.jpeg",
      name: "Proyecto de Construcción Civil",
      description: "Realizamos proyectos de construcción civil de alta calidad, desde la planificación hasta la ejecución, garantizando resultados a medida. Nuestro enfoque integral abarca todas las fases del proyecto, asegurando cumplimiento de plazos y estándares de calidad."
    },
    {
      image: "/../assets/img-servicios/img8.jpeg",
      name: "Proyecto de Subestaciones",
      description: "Diseñamos y construimos subestaciones eléctricas para mejorar la distribución de energía, asegurando un suministro confiable y eficiente. Con un enfoque en la innovación, utilizamos tecnologías avanzadas para optimizar el rendimiento de las instalaciones eléctricas."
    },
    {
      image: "/../assets/img-servicios/img9.jpeg",
      name: "Instalación de Medidores",
      description: "Instalamos medidores bifásicos y trifásicos, asegurando una medición precisa del consumo eléctrico para una gestión eficiente de la energía. Nuestros expertos realizan la instalación y calibración, brindando asesoramiento sobre el uso y mantenimiento de los dispositivos."
    },
    {
      image: "/../assets/img-servicios/img10.jpeg",
      name: "Revisión e Inspección de Medidores",
      description: "Realizamos inspección y mantenimiento preventivo de medidores eléctricos, garantizando su óptimo funcionamiento y prolongando su vida útil. Nuestro equipo realiza diagnósticos precisos y ofrece recomendaciones para asegurar una medición continua y efectiva."
    }
  ];




}
