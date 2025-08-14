from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import PumpMake, PumpModel, PumpSize, PartNumber, PartName, MaterialOfConstruction
from .serializers import (
    PumpMakeSerializer, PumpModelSerializer, PumpSizeSerializer,
    PartNumberSerializer, PartNameSerializer, MaterialOfConstructionSerializer,
    PumpSparesFilterSerializer
)


class PumpMakeListView(generics.ListAPIView):
    """Get all pump makes"""
    queryset = PumpMake.objects.all()
    serializer_class = PumpMakeSerializer


class PumpModelListView(generics.ListAPIView):
    """Get all pump models"""
    queryset = PumpModel.objects.all()
    serializer_class = PumpModelSerializer


class PumpSizeListView(generics.ListAPIView):
    """Get all pump sizes"""
    queryset = PumpSize.objects.all()
    serializer_class = PumpSizeSerializer


class PartNumberListView(generics.ListAPIView):
    """Get all part numbers"""
    queryset = PartNumber.objects.all()
    serializer_class = PartNumberSerializer


class PartNameListView(generics.ListAPIView):
    """Get all part names"""
    queryset = PartName.objects.all()
    serializer_class = PartNameSerializer


class MaterialOfConstructionListView(generics.ListAPIView):
    """Get all materials of construction"""
    queryset = MaterialOfConstruction.objects.all()
    serializer_class = MaterialOfConstructionSerializer


@api_view(['GET'])
def get_filtered_options(request):
    """
    Get filtered options based on current selections.
    This endpoint returns available options for each filter based on current selections.
    """
    pump_make_id = request.GET.get('pump_make')
    pump_model_id = request.GET.get('pump_model')
    pump_size_id = request.GET.get('pump_size')
    part_number_id = request.GET.get('part_number')
    part_name_id = request.GET.get('part_name')
    
    def get_options_for_field(exclude_field=None):
        """Get filtered options excluding a specific field to show all available options for that field"""
        materials_qs = MaterialOfConstruction.objects.select_related(
            'pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name'
        )
        
        if pump_make_id and exclude_field != 'pump_make':
            materials_qs = materials_qs.filter(pump_make_id=pump_make_id)
        if pump_model_id and exclude_field != 'pump_model':
            materials_qs = materials_qs.filter(pump_model_id=pump_model_id)
        if pump_size_id and exclude_field != 'pump_size':
            materials_qs = materials_qs.filter(pump_size_id=pump_size_id)
        if part_number_id and exclude_field != 'part_number':
            materials_qs = materials_qs.filter(part_number_id=part_number_id)
        if part_name_id and exclude_field != 'part_name':
            materials_qs = materials_qs.filter(part_name_id=part_name_id)
        
        return materials_qs
    
    pump_makes = set()
    pump_models = set()
    pump_sizes = set()
    part_numbers = set()
    part_names = set()
    
    for material in get_options_for_field('pump_make'):
        pump_makes.add((material.pump_make.id, material.pump_make.name))
    
    for material in get_options_for_field('pump_model'):
        pump_models.add((material.pump_model.id, material.pump_model.name))
    
    for material in get_options_for_field('pump_size'):
        pump_sizes.add((material.pump_size.id, material.pump_size.size))
    
    for material in get_options_for_field('part_number'):
        part_numbers.add((material.part_number.id, material.part_number.part_no))
    
    for material in get_options_for_field('part_name'):
        part_names.add((material.part_name.id, material.part_name.name))
    
    return Response({
        'pump_makes': [{'id': id, 'name': name} for id, name in sorted(pump_makes, key=lambda x: x[1])],
        'pump_models': [{'id': id, 'name': name} for id, name in sorted(pump_models, key=lambda x: x[1])],
        'pump_sizes': [{'id': id, 'size': size} for id, size in sorted(pump_sizes, key=lambda x: x[1])],
        'part_numbers': [{'id': id, 'part_no': part_no} for id, part_no in sorted(part_numbers, key=lambda x: x[1])],
        'part_names': [{'id': id, 'name': name} for id, name in sorted(part_names, key=lambda x: x[1])],
    })


@api_view(['GET'])
def get_materials_for_part(request):
    """
    Get all materials of construction for a specific part combination.
    Requires pump_make, pump_model, pump_size, part_number, and part_name parameters.
    """
    pump_make_id = request.GET.get('pump_make')
    pump_model_id = request.GET.get('pump_model')
    pump_size_id = request.GET.get('pump_size')
    part_number_id = request.GET.get('part_number')
    part_name_id = request.GET.get('part_name')
    
    if not all([pump_make_id, pump_model_id, pump_size_id, part_number_id, part_name_id]):
        return Response({
            'error': 'All parameters are required: pump_make, pump_model, pump_size, part_number, part_name'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    materials = MaterialOfConstruction.objects.filter(
        pump_make_id=pump_make_id,
        pump_model_id=pump_model_id,
        pump_size_id=pump_size_id,
        part_number_id=part_number_id,
        part_name_id=part_name_id
    ).select_related(
        'pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name'
    )
    
    if not materials.exists():
        return Response({
            'error': 'No materials found for the specified part combination'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = MaterialOfConstructionSerializer(materials, many=True)
    
    first_material = materials.first()
    part_specs = {
        'pump_make': first_material.pump_make.name,
        'pump_model': first_material.pump_model.name,
        'pump_size': first_material.pump_size.size,
        'part_number': first_material.part_number.part_no,
        'part_name': first_material.part_name.name,
    }
    
    return Response({
        'part_specifications': part_specs,
        'materials': serializer.data
    })


@api_view(['GET'])
def get_material_by_id(request, material_id):
    """Get a specific material by ID for cart/quote functionality"""
    try:
        material = MaterialOfConstruction.objects.select_related(
            'pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name'
        ).get(id=material_id)
        serializer = MaterialOfConstructionSerializer(material)
        return Response(serializer.data)
    except MaterialOfConstruction.DoesNotExist:
        return Response({
            'error': 'Material not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def generate_receipt(request):
    """Generate and download receipt for selected material - Requires authentication"""
    from .receipt_generator import create_receipt_response
    
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return Response({
            'error': 'Authentication required. Please log in to download receipts.'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        material_id = request.data.get('material_id')
        
        if not material_id:
            return Response({
                'error': 'Material ID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        material = MaterialOfConstruction.objects.select_related(
            'pump_make', 'pump_model', 'pump_size', 'part_number', 'part_name'
        ).get(id=material_id)
        
        serializer = MaterialOfConstructionSerializer(material)
        material_data = serializer.data
        
        user_info = {}
        if request.user.is_authenticated:
            user_info = {
                'user_unique_code': request.user.user_unique_code,
                'full_name': request.user.full_name or '',
                'company_name': request.user.company_name or '',
                'company_address': request.user.company_address or '',
                'official_email': request.user.official_email,
                'gst_number': request.user.gst_number or '',
                'location': request.user.location or ''
            }
        
        return create_receipt_response(material_data, user_info)
        
    except MaterialOfConstruction.DoesNotExist:
        return Response({
            'error': 'Material not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': f'Error generating receipt: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
