from flask import Flask, render_template, url_for
import os

app = Flask(__name__)

# Configuración de la aplicación
app.config['SECRET_KEY'] = '73831916'

# Datos del carrusel
carousel_data = [
    {
        'image': 'cambiopantalla.jpg',  # Coloca estas imágenes en static/images/
        'title': 'Reparación de Pantallas',
        'description': 'Especialistas en cambio de pantallas para todos los modelos',
        'alt': 'Reparación de smartphones'
    },
    {
        'image': 'accesorios.jpg',
        'title': 'Accesorios Premium', 
        'description': 'Gran variedad de accesorios para tu dispositivo',
        'alt': 'Accesorios para móviles'
    },
    {
        'image': 'tecnicos.jpg',
        'title': 'Servicio Profesional',
        'description': 'Técnicos certificados con años de experiencia',
        'alt': 'Servicio técnico profesional'
    }
]
logo_image = 'images/logo.jpg'  # Coloca el logo en static/images/
# Lista de servicios
services = [
    'Cambio de pantalla',
    'Cambio de pin de carga', 
    'Reparación de placas',
    'Accesorios en general',
    'Protectores de vidrio',
    'Memorias y almacenamiento',
    'Audífonos y cargadores'
]

# Información de contacto
contact_info = {
    'phone_number': '965 458 016',
    'whatsapp_link': 'https://wa.me/+51965458016',
    'address': 'https://maps.app.goo.gl/rRbAhw6D4EKubCFY9',
    'email': 'contacto@sopanta.com'
}

@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html', 
                        carousel_data=carousel_data,
                        services=services,
                        phone_number=contact_info['phone_number'],
                        whatsapp_link=contact_info['whatsapp_link'],
                        logo_image=logo_image)
    
@app.route("/catalogo")
def catalogo():
    return render_template("catalogo.html")

@app.route('/servicios')
def servicios():
    """Página de servicios detallados"""
    services_detailed = [
        {
            'name': 'Cambio de Pantallas',
            'description': 'Reparamos pantallas de todas las marcas: iPhone, Samsung, Huawei, Xiaomi y más.',
            'price_range': 'Desde S/50',
            'duration': '60-150 minutos'
        },
        {
            'name': 'Reparación de Pin de Carga',
            'description': 'Solucionamos problemas de carga en tu dispositivo móvil.',
            'price_range': 'Desde S/40', 
            'duration': '45-90 minutos'
        },
        {
            'name': 'Reparación de Placas',
            'description': 'Servicio especializado en reparación de circuitos internos.',
            'price_range': 'Cotización personalizada',
            'duration': '2-5 días'
        }
    ]
    
    return render_template('servicios.html', 
        services_detailed=services_detailed,
        phone_number=contact_info['phone_number'])

@app.route('/contacto')
def contacto():
    """Página de contacto"""
    return render_template('contacto.html',
        contact_info=contact_info)


@app.errorhandler(500)
def internal_error(error):
    """Página de error 500"""
    return render_template('500.html'), 500

# Función auxiliar para verificar archivos de imagen
def check_image_files():
    """Verifica que las imágenes del carrusel existan"""
    image_folder = os.path.join(app.static_folder, 'images')
    
    if not os.path.exists(image_folder):
        print(f"⚠️  La carpeta {image_folder} no existe. Créala y agrega las imágenes:")
        for slide in carousel_data:
            print(f"   - {slide['image']}")
        return False
    
    missing_images = []
    for slide in carousel_data:
        image_path = os.path.join(image_folder, slide['image'])
        if not os.path.exists(image_path):
            missing_images.append(slide['image'])
    
    if missing_images:
        print("⚠️  Imágenes faltantes en static/images/:")
        for img in missing_images:
            print(f"   - {img}")
        return False
    
    return True

# Context processor para variables globales
@app.context_processor
def inject_globals():
    """Inyecta variables globales en todos los templates"""
    return {
        'company_name': 'SOPANTA',
        'current_year': 2025,
        'social_media': {
            'facebook': 'https://www.facebook.com/profile.php?id=100063466593855',
            'instagram': 'https://instagram.com/sopanta',
            'tiktok': 'https://tiktok.com/@sopanta'
        }
    }

if __name__ == '__main__':
    app.run(debug=True)
