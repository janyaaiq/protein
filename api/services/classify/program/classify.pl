#this script is used to make the random.
use List::Util qw(shuffle);
use Scalar::Util qw(looks_like_number);
use MongoDB;
use MongoDB::OID;
$usage="Usage:perl random.pl infile rule \n";
if($#ARGV != 1)
{
	die print "Parameter is missing!\n$usage";
}
($inf,$rule_f)=@ARGV;
open(IF,$inf)||die $!;
@classes = ("LOCUS","DEFINITION","ACCESSION","VERSION","DBLINK","DBSOURCE","KEYWORDS","SOURCE","REFERENCE","COMMENT","FEATURES","ORIGIN");
&get_rule;
&insert_db;
while(<IF>)
{
	&get_info;
}
sub get_info
{
	if(/^LOCUS/)
	{
		%info={};
		$info = '';
		$key = "";
		foreach $class (@classes)
		{
			$info{$class}="";
		}
	}
	$info=$info.$_;
	if(/^ACCESSION/)
	{
		chomp;
		@arr= split/\s+/;
#		/ACCESSION\s+([\s\S]+)/;
		$id = $arr[1];	
	}
	if(/^\/\//)
	{
		$key="";
		$subclass = &classify;
		if($subclass =~ /[A-Z]/)
		{
			$superclass=1;
		}
		else
		{
			$superclass=2;
		}
		$state = "unprocess";
		$info_in_last_db = "unkown";
#		print OUT ">$id\n$info{'ORIGIN'}\n$superclass\n$subclass\n";
        $doc = $coll->find_one( { _id => $id } );
        if($doc)
        {
        	$coll->delete_one( { _id =>  $id } );
        }
#			$coll->update_one( {_id => $id }, {Infomation => $info,Sequence => $info{'ORIGIN'},Superclass => $superclass,Subclass => $subclass ,State => "unprocess",Reason => "no reason",Info_in_last_db => "unknown"} );

			$coll->insert({_id => $id, Infomation => $info,Sequence => $info{'ORIGIN'},Superclass => $superclass,Subclass => $subclass ,State => "unprocess",Reason => "no reason",Info_in_last_db => "unknown"});
#		print OUT "$id\t$superclass\t$subclass\n";
	}
	if(/^[A-Z]/)
	{
		chomp;
		@arr=split(/\s+/,$_,2);
		$key=$arr[0];
		$info{$key}=$info{$key}.$arr[1];
	}
    elsif(/^\s+/)
	{
		chomp;
		if($key eq "ORIGIN")
		{
			/^\s+\d+\s+([\s\S]+)/;
			@arr = split(/\s+/,$1);
			$seq=join("",@arr);
			$info{$key}=$info{$key}.$seq;
		}
		else
		{
			s/^\s+/ /;
			$info{$key}=$info{$key}.$_;
		}
	}
}

sub get_rule
{
#	%rule={};
	open(RULE,$rule_f)||die $!;
	while(<RULE>)
	{
		if(/^\d/)
		{
			chomp;
			@arr=split/\t/;
			$rule_num = $arr[0];
			$rule{$rule_num} = $_;
		}
	}
}

sub classify
{
	$class = 1;
	while(looks_like_number($class))
	{
			$field_info="";
			$rules = $rule{$class};
			@arr=split(/\t/,$rules);
			@key_word=split(/\|/,$arr[1]);
			if($arr[2] =~ /\-/)
			{
				@tem = split(/\-/,$arr[2]);
				foreach $num ($tem[0]..$tem[1])
				{
					$field_info = $field_info.$info{$classes[$num-1]};
				}
			}
			elsif($arr[2] =~ /\|/)
			{
				@tem = split(/\|/,$arr[2]);
				foreach $num (@tem)
				{
					$field_info = $field_info.$info{$classes[$num-1]};
				}
			}
			else
			{
				$field_info = $info{$classes[$arr[2]-1]}
			}
			$class = $arr[3];
			foreach $key (@key_word)
			{
				if($field_info =~ /$key/i)
				{
					$class = $arr[4];
					last;
				}
			}
	}
	return $class;
}

sub insert_db
{
	$database_mo = "protein";
	$collection = "temp_table";
	$user_mo = "user1";
	$password_mo = "password";
#	$conn = MongoDB::MongoClient->new( "username" => $user_mo, "password" => $password_mo, "db_name" => $database_mo);
	$conn = MongoDB::MongoClient->new("db_name" => $database_mo);
	$db = $conn->get_database($database_mo);
	$coll = $db->get_collection($collection);
}