class Circle{
    private double radius;
    private int numberOfObjects;
    Circle(double newRadius, int newNumberOfObjects){
        radius = newRadius;
        numberOfObjects = newNumberOfObjects;
    }
    public double getRadius(){
        return radius ;
    }
    public void setRadius(double newRadius){
        radius = newRadius;
    }
    public int getNumberOfObjects(){
        return numberOfObjects;
    }
    public double getArea(){
        return radius * radius * Math.PI;
    }

}